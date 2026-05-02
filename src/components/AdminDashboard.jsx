import { useState, useEffect } from 'react';
import { CONTACT } from '../data/products';
import { decrementStock, incrementStock, validatePrice, formatPrice, isLowStock, isSoldOut } from '../utils/stock';
import { fetchProducts, updateProductInDb, subscribeToProductChanges } from '../lib/supabase';
import { getProductImage } from '../lib/productImages';

function logEvent(eventType, payload) {
  const timestamp = new Date().toISOString();
  console.log('[admin-event]', timestamp, eventType, payload);
}

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [drafts, setDrafts] = useState({});
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
        const newDrafts = {};
        data.forEach(prod => {
          newDrafts[prod.id] = {
            price: String(prod.price),
            name: prod.name,
            description: prod.description,
          };
        });
        setDrafts(newDrafts);
      } catch (err) {
        setErrorMessage('Failed to load: ' + err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    loadProducts();
    const unsubscribe = subscribeToProductChanges(() => loadProducts());
    return () => { cancelled = true; unsubscribe(); };
  }, []);

  const showSaved = () => { setSavedMessage('Saved'); setTimeout(() => setSavedMessage(''), 1800); };
  const showError = (msg) => { setErrorMessage(msg); setTimeout(() => setErrorMessage(''), 3000); };

  const updateDraft = (productId, field, value) => {
    setDrafts(prev => ({ ...prev, [productId]: { ...prev[productId], [field]: value } }));
  };

  const handleStockChange = async (productId, delta) => {
    const product = products.find(prod => prod.id === productId);
    if (!product) return;
    try {
      const newStock = delta > 0 ? incrementStock(product.stock, delta) : decrementStock(product.stock, Math.abs(delta));
      logEvent('stock_change', { productId, oldStock: product.stock, newStock });
      await updateProductInDb(productId, { stock: newStock });
      showSaved();
    } catch (err) {
      showError('Error: ' + err.message);
    }
  };

  const handlePriceSave = async (productId) => {
    const draft = drafts[productId];
    if (!draft) return;
    const num = Number(draft.price);
    const error = validatePrice(num);
    const product = products.find(prod => prod.id === productId);
    if (error) {
      showError(error);
      if (product) updateDraft(productId, 'price', String(product.price));
      return;
    }
    if (product && num !== product.price) {
      try { await updateProductInDb(productId, { price: num }); showSaved(); }
      catch (err) { showError(err.message); }
    }
  };

  const handleNameSave = async (productId) => {
    const draft = drafts[productId];
    const product = products.find(prod => prod.id === productId);
    if (!draft || !product) return;
    const newName = draft.name.trim();
    if (!newName || newName.length > 80) {
      showError('Name must be 1-80 characters');
      updateDraft(productId, 'name', product.name);
      return;
    }
    if (newName !== product.name) {
      try { await updateProductInDb(productId, { name: newName }); showSaved(); }
      catch (err) { showError(err.message); }
    }
  };

  const handleDescSave = async (productId) => {
    const draft = drafts[productId];
    const product = products.find(prod => prod.id === productId);
    if (!draft || !product) return;
    const newDesc = draft.description.trim();
    if (!newDesc || newDesc.length > 500) {
      showError('Description must be 1-500 characters');
      updateDraft(productId, 'description', product.description);
      return;
    }
    if (newDesc !== product.description) {
      try { await updateProductInDb(productId, { description: newDesc }); showSaved(); }
      catch (err) { showError(err.message); }
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
      event.preventDefault();
      event.target.blur();
    }
  };

  const handleLogout = () => { logEvent('admin_logout', {}); onLogout(); };

  if (isLoading) {
    return (<div className="admin"><p style={{ textAlign: 'center', padding: '3rem' }}>Loading...</p></div>);
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <h1 className="admin__title">Admin Dashboard</h1>
          <p className="admin__subtitle">{CONTACT.businessName} - Live Cloud-backed</p>
        </div>
        <div className="admin__header-actions">
          {savedMessage && <span className="admin__saved">v {savedMessage}</span>}
          {errorMessage && <span className="admin__saved" style={{ background: '#fde4e4', color: '#a13b14' }}>! {errorMessage}</span>}
          <a href="/" className="admin__link">View public site</a>
          <button onClick={handleLogout} className="btn admin__logout">Log Out</button>
        </div>
      </header>
      <p className="admin__hint">Edit any field. Press Enter or click outside to save.</p>
      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr><th>Photo</th><th>Name and Description</th><th>Price</th><th>Stock</th><th>Status</th><th>Adjust</th></tr>
          </thead>
          <tbody>
            {products.map(prod => {
              const k = prod.id;
              const draft = drafts[k] || { price: '', name: '', description: '' };
              const status = isSoldOut(prod.stock)
                ? { label: 'Sold Out', className: 'tag tag--sold-out' }
                : isLowStock(prod.stock)
                ? { label: 'Low Stock', className: 'tag tag--low' }
                : { label: 'In Stock', className: 'tag tag--ok' };
              return (
                <tr key={k}>
                  <td><img src={getProductImage(k)} alt="" className="admin__thumb" loading="lazy" /></td>
                  <td className="admin__name-cell">
                    <input type="text" value={draft.name}
                      onChange={(e) => updateDraft(k, 'name', e.target.value)}
                      onBlur={() => handleNameSave(k)}
                      onKeyDown={onKeyDown}
                      className="admin__input admin__input--name"
                      maxLength={80} />
                    <textarea value={draft.description}
                      onChange={(e) => updateDraft(k, 'description', e.target.value)}
                      onBlur={() => handleDescSave(k)}
                      className="admin__input admin__input--desc"
                      maxLength={500} rows={2} />
                    <div className="admin__unit">per {prod.unit}</div>
                  </td>
                  <td>
                    <input type="number" min="0" step="0.01" value={draft.price}
                      onChange={(e) => updateDraft(k, 'price', e.target.value)}
                      onBlur={() => handlePriceSave(k)}
                      onKeyDown={onKeyDown}
                      className="admin__input admin__input--price" />
                    <div className="admin__current">Current: {formatPrice(prod.price)}</div>
                  </td>
                  <td className="admin__stock-num">{prod.stock}</td>
                  <td><span className={status.className}>{status.label}</span></td>
                  <td className="admin__controls">
                    <button type="button" onClick={() => handleStockChange(k, -1)} className="admin__btn admin__btn--minus">-1</button>
                    <button type="button" onClick={() => handleStockChange(k, 1)} className="admin__btn admin__btn--plus">+1</button>
                    <button type="button" onClick={() => handleStockChange(k, 5)} className="admin__btn admin__btn--plus">+5</button>
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
