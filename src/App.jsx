import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import AdminLayout from './components/AdminLayout';
import { PRODUCTS as STATIC_PRODUCTS, CONTACT } from './data/products';
import { fetchProducts, subscribeToProductChanges } from './lib/supabase';
import './App.css';

function PublicSite() {
  const [products, setProducts] = useState(STATIC_PRODUCTS); // fallback while loading
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (!cancelled && data && data.length > 0) {
          setProducts(data);
          setUsingFallback(false);
        }
      } catch (err) {
        console.warn('Using static product fallback:', err.message);
        if (!cancelled) setUsingFallback(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadProducts();

    // Real-time updates: re-fetch whenever any product changes
    const unsubscribe = subscribeToProductChanges(() => {
      loadProducts();
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <h1 className="hero__title">{CONTACT.businessName}</h1>
        <p className="hero__tagline">
          Homemade Filipino desserts, made fresh daily.
        </p>
        <p className="hero__hint">
          Browse below, then contact us directly to place your order 👇
        </p>
      </header>

      <main className="grid">
        {isLoading && products === STATIC_PRODUCTS && (
          <p className="grid__loading">Loading the latest menu…</p>
        )}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>

      <section className="how-to-order" id="order">
        <h2 className="how-to-order__title">How to Order</h2>
        <ol className="how-to-order__steps">
          <li>Pick your desserts from the menu above.</li>
          <li>Message us on Facebook or text/call our business number.</li>
          <li>We'll confirm your order, total, and pickup or delivery time.</li>
        </ol>
      </section>

      <footer className="footer">
        <h2 className="footer__title">Contact Us</h2>

        <div className="contact-grid">
          <div className="contact-item">
            <span className="contact-item__icon">👤</span>
            <div className="contact-item__body">
              <span className="contact-item__label">Owner</span>
              <span className="contact-item__value">{CONTACT.ownerName}</span>
            </div>
          </div>

          <a
            href={CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item contact-item--link"
          >
            <span className="contact-item__icon">💬</span>
            <div className="contact-item__body">
              <span className="contact-item__label">Facebook</span>
              <span className="contact-item__value">
                facebook.com/{CONTACT.messengerUsername}
              </span>
            </div>
          </a>

          <a
            href={`tel:${CONTACT.phone}`}
            className="contact-item contact-item--link"
          >
            <span className="contact-item__icon">📞</span>
            <div className="contact-item__body">
              <span className="contact-item__label">Call or Text</span>
              <span className="contact-item__value">{CONTACT.phone}</span>
            </div>
          </a>

          <div className="contact-item">
            <span className="contact-item__icon">📍</span>
            <div className="contact-item__body">
              <span className="contact-item__label">Location</span>
              <span className="contact-item__value">{CONTACT.location}</span>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item__icon">🕒</span>
            <div className="contact-item__body">
              <span className="contact-item__label">Hours</span>
              <span className="contact-item__value">{CONTACT.hours}</span>
            </div>
          </div>
        </div>

        {usingFallback && (
          <p className="footer__notice">
            (Note: showing cached menu — live data temporarily unavailable.)
          </p>
        )}

        <p className="footer__credit">
          © {new Date().getFullYear()} {CONTACT.businessName}. Made with ❤️ in CDO.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminLayout />} />
    </Routes>
  );
}
