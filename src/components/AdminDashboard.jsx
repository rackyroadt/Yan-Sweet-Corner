import { useState, useEffect, useCallback } from 'react';
import { CONTACT } from '../data/products';
import { decrementStock, incrementStock, validatePrice, formatPrice, isLowStock, isSoldOut } from '../utils/stock';
import { fetchProducts, updateProductInDb, subscribeToProductChanges, supabase } from '../lib/supabase';
import { getProductImage } from '../lib/productImages';

function logEvent(eventType, payload) {
  const timestamp = new Date().toISOString();
  console.log('[admin-event]', timestamp, eventType, payload);
}

function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [savedMessage, setSavedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', unit: 'piece', stock: ''
  });

  const loadProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      const newDrafts = {};
      data.forEach(prod => {
        newDrafts[prod.id] = {
          price: String(prod.price), name: prod.name, description: prod.description,
        };
      });
      setDrafts(newDrafts);
    } catch (err) {
      setErrorMessage('Failed to load: ' + err.message);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadProducts();
      if (!cancelled) setIsLoading(false);
    })();
    const unsubscribe = subscribeToProductChanges(() => loadProducts());
    return () => { cancelled = true; unsubscribe(); };
  }, [loadProducts]);

  const showSaved = (msg) => { setSavedMessage(msg || 'Saved'); setTimeout(() => setSavedMessage(''), 1800); };
  const showError = (msg) => { setErrorMessage(msg); setTimeout(() => setErrorMessage(''), 3500); };

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

  const handleAddProduct = async () => {
    const name = newProduct.name.trim();
    const description = newProduct.description.trim();
    const price = Number(newProduct.price);
    const unit = newProduct.unit.trim();
    const stock = parseInt(newProduct.stock, 10);

    if (!name || name.length > 80) { showError('Name required (1-80 chars)'); return; }
    if (!description || description.length > 500) { showError('Description required (1-500 chars)'); return; }
    if (validatePrice(price)) { showError(validatePrice(price)); return; }
    if (!unit) { showError('Unit required (e.g. piece, cup)'); return; }
    if (isNaN(stock) || stock < 0) { showError('Stock must be a non-negative number'); return; }

    const id = slugify(name);
    if (!id) { showError('Name must contain letters or numbers'); return; }
    if (products.find(p => p.id === id)) { showError('A product with this name already exists'); return; }

    try {
      const { error } = await supabase.from('products').insert({
        id, name, description, price, unit, stock,
        image: '/products/placeholder.svg',
      });
      if (error) throw error;
      logEvent('product_added', { id, name });
      setShowAddModal(false);
      setNewProduct({ name: '', description: '', price: '', unit: 'piece', stock: '' });
      await loadProducts();
      showSaved('Product added');
    } catch (err) {
      showError('Add failed: ' + err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) throw error;
      logEvent('product_deleted', { productId });
      setConfirmDeleteId(null);
      await loadProducts();
      showSaved('Deleted');
    } catch (err) {
      showError('Delete failed: ' + err.message);
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 1rem' }}>
        <p className="admin__hint" style={{ margin: 0, flex: 1 }}>Edit any field. Press Enter or click outside to save.</p>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn admin__add-btn"
          style={{ marginLeft: '1rem' }}
        >
          + Add New Product
        </button>
      </div>

      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr><th>Photo</th><th>Name and Description</th><th>Price</th><th>Stock</th><th>Status</th><th>Adjust</th><th></th></tr>
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
                  <td>
                    <button type="button"
                      onClick={() => setConfirmDeleteId(k)}
                      className="admin__btn admin__btn--delete"
                      title="Delete product">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="admin__modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin__modal-title">Add New Product</h2>
            <div className="admin__modal-body">
              <label className="admin__modal-label">
                Name (e.g. Maja Blanca)
                <input type="text" value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="admin__input" maxLength={80} autoFocus />
              </label>
              <label className="admin__modal-label">
                Description
                <textarea value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="admin__input" maxLength={500} rows={3} />
              </label>
              <div className="admin__modal-row">
                <label className="admin__modal-label" style={{ flex: 1 }}>
                  Price (PHP)
                  <input type="number" min="0" step="0.01" value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="admin__input" />
                </label>
                <label className="admin__modal-label" style={{ flex: 1 }}>
                  Unit
                  <input type="text" value={newProduct.unit}
                    onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="admin__input" placeholder="piece, cup..." />
                </label>
                <label className="admin__modal-label" style={{ flex: 1 }}>
                  Stock
                  <input type="number" min="0" value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="admin__input" />
                </label>
              </div>
            </div>
            <div className="admin__modal-actions">
              <button onClick={() => setShowAddModal(false)} className="btn admin__logout">Cancel</button>
              <button onClick={handleAddProduct} className="btn admin__btn--plus" style={{ padding: '0.6rem 1.2rem' }}>Add Product</button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="admin__modal-overlay" onClick={() => setConfirmDeleteId(null)}>
          <div className="admin__modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h2 className="admin__modal-title">Delete this product?</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              This will permanently remove "{products.find(p => p.id === confirmDeleteId)?.name}" from the public site. This cannot be undone.
            </p>
            <div className="admin__modal-actions">
              <button onClick={() => setConfirmDeleteId(null)} className="btn admin__logout">Cancel</button>
              <button onClick={() => handleDelete(confirmDeleteId)} className="btn admin__btn--minus" style={{ padding: '0.6rem 1.2rem' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
