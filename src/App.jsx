// src/App.jsx
import ProductCard from './components/ProductCard';
import { PRODUCTS, CONTACT } from './data/products';
import './App.css';

export default function App() {
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
        {PRODUCTS.map((product) => (
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

        <p className="footer__credit">
          © {new Date().getFullYear()} {CONTACT.businessName}. Made with ❤️ in CDO.
        </p>
      </footer>
    </div>
  );
}
