export const LOW_STOCK_THRESHOLD = 3;


export function decrementStock(stock, quantity = 1) {
  validateNumber(stock, 'stock');
  validateNonNegative(quantity, 'quantity');
  return Math.max(0, stock - quantity);
}

export function incrementStock(stock, quantity = 1) {
  validateNumber(stock, 'stock');
  validateNonNegative(quantity, 'quantity');
  return stock + quantity;
}


export function validatePrice(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'Price must be a number';
  }
  if (price < 0) {
    return 'Price cannot be negative';
  }
  if (price > 100000) {
    return 'Price seems unreasonably high';
  }
  return null;
}


export function isSoldOut(stock) {
  return stock <= 0;
}


export function isLowStock(stock) {
  return stock > 0 && stock <= LOW_STOCK_THRESHOLD;
}


export function canReserve(stock) {
  return stock > 0;
}


export function formatPrice(price) {
  return `₱${price.toFixed(2)}`;
}


function validateNumber(value, name) {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError(`${name} must be a valid number, got: ${value}`);
  }
}

function validateNonNegative(value, name) {
  validateNumber(value, name);
  if (value < 0) {
    throw new RangeError(`${name} cannot be negative, got: ${value}`);
  }
}