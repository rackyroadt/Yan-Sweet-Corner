// Business logic for product stock management.

export const LOW_STOCK_THRESHOLD = 3;

/**
 * Decrease stock by a given quantity (default 1).
 */
export function decrementStock(stock, quantity = 1) {
  return Math.max(0, stock - quantity);
}

/**
 * Increase stock by a given quantity (default 1).
 */
export function incrementStock(stock, quantity = 1) {
  return stock + quantity;
}

/**
 * Returns true if the product is sold out.
 */
export function isSoldOut(stock) {
  return stock <= 0;
}

/**
 * Returns true if stock is low (≤ threshold) but not yet sold out.
 */
export function isLowStock(stock) {
  return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
}

/**
 * Returns true if a customer can reserve this product.
 */
export function canReserve(stock) {
  return stock > 0;
}

/**
 * Formats a number as a Philippine peso price string.
 */
export function formatPrice(price) {
  return `₱${price.toFixed(2)}`;
}
