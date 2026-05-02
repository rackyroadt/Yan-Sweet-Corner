import mangoFloat from '../assets/products/mango-float.jpeg';
import strawberryFloat from '../assets/products/strawberry-float.jpeg';
import berryFloat from '../assets/products/berry-float.jpeg';
import lecheFlan from '../assets/products/leche-flan.png';
import puto from '../assets/products/puto.jpeg';
import kutsinta from '../assets/products/kutsinta.jpeg';
import cookies from '../assets/products/cookies.jpeg';
import crinkles from '../assets/products/crinkles.jpeg';
import polvoron from '../assets/products/polvoron.jpeg';
import placeholder from '../assets/products/placeholder.svg';

export const PRODUCT_IMAGES = {
  'mango-float': mangoFloat,
  'strawberry-float': strawberryFloat,
  'blueberry-float': berryFloat,
  'leche-flan': lecheFlan,
  'puto': puto,
  'kutsinta': kutsinta,
  'cookies': cookies,
  'crinkles': crinkles,
  'polvoron': polvoron,
};

export function getProductImage(productId) {
  return PRODUCT_IMAGES[productId] || placeholder;
}