import { useState, useEffect } from 'react';
import { CONTACT } from '../data/products';
import { decrementStock, incrementStock, validatePrice, formatPrice, isLowStock, isSoldOut } from '../utils/stock';
import { getProductImage } from '../lib/productImages';
import { fetchProducts, updateProductInDb, subscribeToProductChanges } from '../lib/supabase';

function logEvent(eventType, payload) {
  const timestamp = new Date().toISOString();
  console.log('[admin-event]', timestamp, eventType, payload);
}

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [priceDrafts, setPriceDrafts] = useState({});
  const [savedMessage, setSavedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (cancelled) return;
        setProducts(data);
        const drafts = {};
        data.forEach(prod => { drafts[prod.id] = String(prod.price); });
        setPriceDrafts(drafts);
      } catch (err) {
        setErrorMessage('Failed to load products from database: ' + err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadProducts();

    const unsubscribe = subscribeToProductChanges(() => loadProducts());
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  const showSaved = () => {
    setSavedMessage('Saved to cloud');
    setTimeout(() => setSavedMessage(''), 1800);
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleStockChange = async (productId, delta) => {
    const product = products.find(prod => prod.id === productId);
    if (!product) return;
    try {
      const newStock = delta > 0
        ? incrementStock(product.stock, delta)
        : decrementStock(product.stock, Math.abs(delta));
      logEvent('stock_change', { productId, oldStock: product.stock, newStock, delta });
      await updateProductInDb(productId, { stock: newStock });
      showSaved();
    } catch (err) {
      logEvent('stock_change_error', { productId, error: err.message });
      showError('Error: ' + err.message);
    }
  };

  const handlePriceDraftChange = (productId, value) => {
    setPriceDrafts(prev => ({ ...prev, [productId]: value }));
  };

  const handlePriceSave = async (productId) => {
    const draft = priceDrafts[productId];
    const num = Number(draft);
    const error = validatePrice(num);
    const product = products.find(prod => prod.id === productId);
    if (error) {
      logEvent('price_save_rejected', { productId, attempted: draft, reason: error });
      showError(error);
      if (product) {
        setPriceDrafts(prev => ({ ...prev, [productId]: String(product.price) }));
      }
      return;
    }
    if (product && num !== product.price) {
      try {
        logEvent('price_change', { productId, oldPrice: product.price, newPrice: num });
        await updateProductInDb(productId, { price: num });
        showSaved();
      } catch (err) {
        showError('Error saving price: ' + err.message);
      }
    }
  };

  const onPriceInputChange = (productId) => (event) => {
    handlePriceDraftChange(productId, event.target.value);
  };

  const onPriceInputBlur = (productId) => () => {
    handlePriceSave(productId);
  };

  const onPriceInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleLogout = () => {
    logEvent('admin_logout', {});
    onLogout();
  };

  if (isLoading) {
    return (
      <div className="admin">
        <p style={{ textAlign: 'center', padding: '3rem' }}>Loading products from cloud database…</p>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <h1 className="admin__title">Admin Dashboard</h1>
          <p className="admin__subtitle">{CONTACT.businessName} — Stock & Pricing (Live, Cloud-backed)</p>
        </div>
        <div className="admin__header-actions">
          {savedMessage && <span className="admin__saved">✓ {savedMessage}</span>}
          {errorMessage && <span className="admin__saved" style={{ background: '#fde4e4', color: '#a13b14' }}>⚠ {errorMessage}</span>}
          <a href="/" className="admin__link">View public site →</a>
          <button onClick={handleLogout} className="btn admin__logout">Log Out</button>
        </div>
      </header>
      <p className="admin__hint">
        💡 Changes save instantly to the cloud database. The public site updates in real-time across all devices.
      </p>
      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr><th>Product</th><th>Price</th><th>Stock</th><th>Status</th><th>Adjust</th></tr>
          </thead>
          <tbody>
            {products.map(prod => {
              const productKey = prod.id;
              const status = isSoldOut(prod.stock)
                ? { label: 'Sold Out', className: 'tag tag--sold-out' }
                : isLowStock(prod.stock)
                ? { label: 'Low Stock', className: 'tag tag--low' }
                : { label: 'In Stock', className: 'tag tag--ok' };
              return (
                <tr key={productKey}>
                  <td className="admin__product">
                    <img src={getProductImage(prod.id)} alt="" className="admin__thumb" loading="lazy" />
                    <div><strong>{prod.name}</strong><div className="admin__unit">per {prod.unit}</div></div>
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01"
                      value={priceDrafts[productKey] || ''}
                      onChange={onPriceInputChange(productKey)}
                      onBlur={onPriceInputBlur(productKey)}
                      onKeyDown={onPriceInputKeyDown}
                      className="admin__input admin__input--price"
                      aria-label={'Price for ' + prod.name} />
                    <div className="admin__current">Current: {formatPrice(prod.price)}</div>
                  </td>
                  <td className="admin__stock-num">{prod.stock}</td>
                  <td><span className={status.className}>{status.label}</span></td>
                  <td className="admin__controls">
                    <button type="button" onClick={() => handleStockChange(productKey, -1)} className="admin__btn admin__btn--minus">−1</button>
                    <button type="button" onClick={() => handleStockChange(productKey, 1)} className="admin__btn admin__btn--plus">+1</button>
                    <button type="button" onClick={() => handleStockChange(productKey, 5)} className="admin__btn admin__btn--plus">+5</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

