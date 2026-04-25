// src/components/AdminDashboard.jsx
import { useState } from 'react';
import { PRODUCTS, CONTACT } from '../data/products';
import {
  decrementStock,
  incrementStock,
  validatePrice,
  formatPrice,
  isLowStock,
  isSoldOut,
} from '../utils/stock';

export default function AdminDashboard({ onLogout }) {
  const [products, setProducts] = useState(() =>
    PRODUCTS.map((p) => ({ ...p }))
  );
  const [priceDrafts, setPriceDrafts] = useState(() =>
    Object.fromEntries(PRODUCTS.map((p) => [p.id, String(p.price)]))
  );
  const [savedMessage, setSavedMessage] = useState('');

  const updateProduct = (id, changes) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...changes } : p))
    );
    showSaved();
  };

  const handleStockChange = (id, delta) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    try {
      const newStock =
        delta > 0
          ? incrementStock(product.stock, delta)
          : decrementStock(product.stock, Math.abs(delta));
      updateProduct(id, { stock: newStock });
    } catch (err) {
      alert(`Error updating stock: ${err.message}`);
    }
  };

  const handlePriceDraftChange = (id, value) => {
    setPriceDrafts((prev) => ({ ...prev, [id]: value }));
  };

  const handlePriceSave = (id) => {
    const draft = priceDrafts[id];
    const num = Number(draft);
    const error = validatePrice(num);
    if (error) {
      alert(error);
      const product = products.find((p) => p.id === id);
      setPriceDrafts((prev) => ({ ...prev, [id]: String(product.price) }));
      return;
    }
    updateProduct(id, { price: num });
  };

  const handlePriceKeyDown = (id, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const showSaved = () => {
    setSavedMessage('Saved');
    setTimeout(() => setSavedMessage(''), 1500);
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
          <button onClick={onLogout} className="btn admin__logout">
            Log Out
          </button>
        </div>
      </header>

      <p className="admin__hint">
        💡 Tip: Edit a price, then press <strong>Enter</strong> or click outside the field to save.
        Changes are temporary in this MVP — they reset on reload (planned for v0.7).
      </p>

      <div className="admin__table-wrapper">
        <table className="admin__table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Adjust</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const status = isSoldOut(p.stock)
                ? { label: 'Sold Out', className: 'tag tag--sold-out' }
                : isLowStock(p.stock)
                ? { label: 'Low Stock', className: 'tag tag--low' }
                : { label: 'In Stock', className: 'tag tag--ok' };

              return (
                <tr key={p.id}>
                  <td className="admin__product">
                    <img src={p.image} alt="" className="admin__thumb" loading="lazy" />
                    <div>
                      <strong>{p.name}</strong>
                      <div className="admin__unit">per {p.unit}</div>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={priceDrafts[p.id]}
                      onChange={(e) => handlePriceDraftChange(p.id, e.target.value)}
                      onBlur={() => handlePriceSave(p.id)}
                      onKeyDown={(e) => handlePriceKeyDown(p.id, e)}
                      className="admin__input admin__input--price"
                      aria-label={`Price for ${p.name}`}
                    />
                    <div className="admin__current">Current: {formatPrice(p.price)}</div>
                  </td>
                  <td className="admin__stock-num">{p.stock}</td>
                  <td>
                    <span className={status.className}>{status.label}</span>
                  </td>
                  <td className="admin__controls">
                    <button
                      type="button"
                      onClick={() => handleStockChange(p.id, -1)}
                      className="admin__btn admin__btn--minus"
                    >
                      −1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockChange(p.id, 1)}
                      className="admin__btn admin__btn--plus"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStockChange(p.id, 5)}
                      className="admin__btn admin__btn--plus"
                    >
                      +5
                    </button>
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
