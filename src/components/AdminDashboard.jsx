import { useState } from 'react';
import { PRODUCTS, CONTACT } from '../data/products';
import { decrementStock, incrementStock, validatePrice, formatPrice, isLowStock, isSoldOut } from '../utils/stock';

// Simple logger for admin actions. Logs to console in development;
// in production these calls become no-ops (or could be wired to a real
// logging service in a future version).
function logEvent(eventType, payload) {
  const timestamp = new Date().toISOString();
  console.log('[admin-event]', timestamp, eventType, payload);
}

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState(() => PRODUCTS.map(prod => ({ ...prod })));
  const [priceDrafts, setPriceDrafts] = useState(() => {
    const drafts = {};
    PRODUCTS.forEach(prod => { drafts[prod.id] = String(prod.price); });
    return drafts;
  });
  const [savedMessage, setSavedMessage] = useState('');

  const showSaved = () => {
    setSavedMessage('Saved');
    setTimeout(() => setSavedMessage(''), 1500);
  };

  const updateProduct = (productId, changes) => {
    setProducts(prev => prev.map(prod => prod.id === productId ? { ...prod, ...changes } : prod));
    showSaved();
  };

  const handleStockChange = (productId, delta) => {
    const product = products.find(prod => prod.id === productId);
    if (!product) return;
    try {
      const newStock = delta > 0
        ? incrementStock(product.stock, delta)
        : decrementStock(product.stock, Math.abs(delta));
      logEvent('stock_change', { productId, name: product.name, oldStock: product.stock, newStock, delta });
      updateProduct(productId, { stock: newStock });
    } catch (err) {
      logEvent('stock_change_error', { productId, delta, error: err.message });
      alert('Error updating stock: ' + err.message);
    }
  };

  const handlePriceDraftChange = (productId, value) => {
    setPriceDrafts(prev => ({ ...prev, [productId]: value }));
  };

  const handlePriceSave = (productId) => {
    const num = Number(priceDrafts[productId]);
    const error = validatePrice(num);
    const product = products.find(prod => prod.id === productId);
    if (error) {
      logEvent('price_save_rejected', { productId, attempted: priceDrafts[productId], reason: error });
      alert(error);
      setPriceDrafts(prev => ({ ...prev, [productId]: String(product.price) }));
      return;
    }
    if (product && num !== product.price) {
      logEvent('price_change', { productId, name: product.name, oldPrice: product.price, newPrice: num });
    }
    updateProduct(productId, { price: num });
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

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <h1 className="admin__title">Admin Dashboard</h1>
          <p className="admin__subtitle">{CONTACT.businessName} — Stock & Pricing</p>
        </div>
        <div className="admin__header-actions">
          {savedMessage && <span className="admin__saved">✓ {savedMessage}</span>}
          <a href="/" className="admin__link">View public site →</a>
          <button onClick={handleLogout} className="btn admin__logout">Log Out</button>
        </div>
      </header>
      <p className="admin__hint">
        💡 Tip: Edit a price, then press <strong>Enter</strong> or click outside the field to save.
        Changes are temporary in this MVP.
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
                    <img src={prod.image} alt="" className="admin__thumb" loading="lazy" />
                    <div><strong>{prod.name}</strong><div className="admin__unit">per {prod.unit}</div></div>
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01"
                      value={priceDrafts[productKey]}
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
