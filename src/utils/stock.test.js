import { describe, it, expect } from 'vitest';
import {
  decrementStock,
  incrementStock,
  isSoldOut,
  isLowStock,
  canReserve,
  formatPrice,
  validatePrice,
} from './stock';

describe('decrementStock', () => {
  it('decreases stock by 1 by default', () => {
    expect(decrementStock(5)).toBe(4);
  });

  it('decreases stock by the specified quantity', () => {
    expect(decrementStock(10, 3)).toBe(7);
  });

  it('never returns a negative number, even when over-decrementing', () => {
    expect(decrementStock(2, 5)).toBe(0);
  });

  it('throws when stock is not a number', () => {
    expect(() => decrementStock('five', 1)).toThrow(TypeError);
  });

  it('throws when quantity is negative', () => {
    expect(() => decrementStock(10, -1)).toThrow(RangeError);
  });
});

describe('incrementStock', () => {
  it('increases stock by 1 by default', () => {
    expect(incrementStock(5)).toBe(6);
  });

  it('increases stock by the specified quantity', () => {
    expect(incrementStock(10, 3)).toBe(13);
  });

  it('throws when stock is not a number', () => {
    expect(() => incrementStock(null, 1)).toThrow(TypeError);
  });

  it('throws when quantity is negative', () => {
    expect(() => incrementStock(10, -5)).toThrow(RangeError);
  });
});

describe('validatePrice', () => {
  it('returns null for a valid positive price', () => {
    expect(validatePrice(50)).toBeNull();
  });

  it('returns null for zero', () => {
    expect(validatePrice(0)).toBeNull();
  });

  it('returns an error message for non-numbers', () => {
    expect(validatePrice('100')).toContain('must be a number');
  });

  it('returns an error message for negative prices', () => {
    expect(validatePrice(-5)).toContain('cannot be negative');
  });

  it('returns an error message for unreasonably high prices', () => {
    expect(validatePrice(999999)).toContain('unreasonably high');
  });
});

describe('isSoldOut', () => {
  it('returns true when stock is 0', () => {
    expect(isSoldOut(0)).toBe(true);
  });

  it('returns false when stock is positive', () => {
    expect(isSoldOut(5)).toBe(false);
  });
});

describe('isLowStock', () => {
  it('returns true when stock is at or below the low-stock threshold', () => {
    expect(isLowStock(3)).toBe(true);
    expect(isLowStock(1)).toBe(true);
  });

  it('returns false when stock is comfortably above the threshold', () => {
    expect(isLowStock(10)).toBe(false);
  });

  it('returns false when stock is 0 (that is sold out, not low)', () => {
    expect(isLowStock(0)).toBe(false);
  });
});

describe('canReserve', () => {
  it('returns true when there is stock available', () => {
    expect(canReserve(1)).toBe(true);
  });

  it('returns false when sold out', () => {
    expect(canReserve(0)).toBe(false);
  });
});

describe('formatPrice', () => {
  it('formats a whole number as peso with two decimals', () => {
    expect(formatPrice(150)).toBe('₱150.00');
  });

  it('formats a decimal price correctly', () => {
    expect(formatPrice(99.5)).toBe('₱99.50');
  });
});