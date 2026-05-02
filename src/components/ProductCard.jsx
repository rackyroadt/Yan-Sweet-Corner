import { formatPrice, isLowStock, isSoldOut } from '../utils/stock';
import { getProductImage } from '../lib/productImages';

export default function ProductCard({ product }) {
  const { id, name, description, price, unit, stock } = product;
  const lowStock = isLowStock(stock);
  const soldOut = isSoldOut(stock);
  const imageSrc = getProductImage(id);

  return (
    <article className={`card ${soldOut ? 'card--sold-out' : ''}`}>
      <div className="card__image-wrapper">
        <img
          src={imageSrc}
          alt={name}
          className="card__image"
          loading="lazy"
          decoding="async"
        />
        {soldOut && <span className="badge badge--sold-out">Sold Out</span>}
        {lowStock && !soldOut && (
          <span className="badge badge--low-stock">Low Stock</span>
        )}
      </div>

      <div className="card__body">
        <h3 className="card__name">{name}</h3>
        <p className="card__description">{description}</p>

        <div className="card__meta">
          <div>
            <span className="card__price">{formatPrice(price)}</span>
            <span className="card__unit"> / {unit}</span>
          </div>
          <div className="card__stock">
            {soldOut ? 'Sold Out' : `${stock} left`}
          </div>
        </div>
      </div>
    </article>
  );
}