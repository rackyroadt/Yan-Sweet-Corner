import { isSoldOut, isLowStock, canReserve, formatPrice } from '../utils/stock';
import { CONTACT } from '../data/products';

export default function ProductCard({ product }) {
  const soldOut = isSoldOut(product.stock);
  const lowStock = isLowStock(product.stock);

  const messengerLink = `https://m.me/${CONTACT.messengerUsername}?text=${encodeURIComponent(
    `Hi! I'd like to reserve: ${product.name}`
  )}`;

  return (
    <article className={`card ${soldOut ? 'card--sold-out' : ''}`}>
      <div className="card__image-wrapper">
        <img src={product.image} alt={product.name} className="card__image" />
        {soldOut && <span className="badge badge--sold-out">Sold Out</span>}
        {lowStock && <span className="badge badge--low-stock">Low Stock</span>}
      </div>

      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        <p className="card__description">{product.description}</p>

        <div className="card__meta">
          <span className="card__price">{formatPrice(product.price)}</span>
          <span className="card__stock">
            {soldOut ? 'Out of stock' : `${product.stock} left`}
          </span>
        </div>

        <a
          href={canReserve(product.stock) ? messengerLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn--reserve ${soldOut ? 'btn--disabled' : ''}`}
          aria-disabled={soldOut}
          onClick={(e) => soldOut && e.preventDefault()}
        >
          {soldOut ? 'Unavailable' : 'Reserve via Messenger'}
        </a>
      </div>
    </article>
  );
}
