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
          Browse below → tap <strong>Reserve via Messenger</strong> to order.
        </p>
      </header>

      <main className="grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>

      <footer className="footer">
        <h2 className="footer__title">Contact Us</h2>
        <p>📍 {CONTACT.location}</p>
        <p>🕒 {CONTACT.hours}</p>
        <p>
          💬{' '}
          <a
            href={`https://m.me/${CONTACT.messengerUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on Facebook
          </a>
        </p>
        <p className="footer__credit">
          © {new Date().getFullYear()} {CONTACT.businessName}. Made with ❤️.
        </p>
      </footer>
    </div>
  );
}
