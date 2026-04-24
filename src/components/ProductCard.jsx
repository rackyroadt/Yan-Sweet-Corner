// src/components/ProductCard.jsx
import { isSoldOut, isLowStock, formatPrice } from '../utils/stock';

export default function ProductCard({ product }) {
  const soldOut = isSoldOut(product.stock);
  const lowStock = isLowStock(product.stock);

  return (
    <article className={`card ${soldOut ? 'card--sold-out' : ''}`}>
      <div className="card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="card__image"
          loading="lazy"
          decoding="async"
        />
        {soldOut && <span className="badge badge--sold-out">Sold Out</span>}
        {lowStock && <span className="badge badge--low-stock">Low Stock</span>}
      </div>

      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        <p className="card__description">{product.description}</p>

        <div className="card__meta">
          <span className="card__price">
            {formatPrice(product.price)}
            {product.unit && <span className="card__unit"> / {product.unit}</span>}
          </span>
          <span className="card__stock">
            {soldOut ? 'Out of stock' : `${product.stock} left`}
          </span>
        </div>
      </div>
    </article>
  );
}


