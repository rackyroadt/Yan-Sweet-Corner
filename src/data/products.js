// src/data/products.js
// Product catalog for Yan Sweet Corner.
// Edit prices, descriptions, or starting stocks here — the UI updates automatically.

import mangoFloat from '../assets/products/mango-float.jpeg';
import strawberryFloat from '../assets/products/strawberry-float.jpeg';
import berryFloat from '../assets/products/berry-float.jpeg';
import lecheFlan from '../assets/products/leche-flan.png';
import puto from '../assets/products/puto.jpeg';
import kutsinta from '../assets/products/kutsinta.jpeg';
import cookies from '../assets/products/cookies.jpeg';
import crinkles from '../assets/products/crinkles.jpeg';
import polvoron from '../assets/products/polvoron.jpeg';

export const PRODUCTS = [
  {
    id: 'mango-float',
    name: 'Mango Float',
    description:
      'Classic Filipino dessert with ripe mango slices, graham crackers, and sweet cream. Served by the cup.',
    price: 30,
    unit: 'cup',
    stock: 20,
    image: mangoFloat,
  },
  {
    id: 'strawberry-float',
    name: 'Strawberry Float',
    description:
      'A sweet twist on the classic — fresh strawberries layered with graham and cream. Served by the cup.',
    price: 30,
    unit: 'cup',
    stock: 15,
    image: strawberryFloat,
  },
  {
    id: 'blueberry-float',
    name: 'Blueberry Float',
    description:
      'Rich blueberries folded into creamy graham goodness. Tangy, refreshing, and perfect as a treat.',
    price: 35,
    unit: 'cup',
    stock: 10,
    image: berryFloat,
  },
  {
    id: 'leche-flan',
    name: 'Leche Flan',
    description:
      'Silky-smooth caramel custard made with fresh eggs and milk. Sold per llanera.',
    price: 80,
    unit: 'llanera',
    stock: 6,
    image: lecheFlan,
  },
  {
    id: 'puto',
    name: 'Puto',
    description:
      'Soft, fluffy steamed rice cakes topped with cheese. Perfect merienda any time of day.',
    price: 5,
    unit: 'piece',
    stock: 100,
    image: puto,
  },
  {
    id: 'kutsinta',
    name: 'Kutsinta',
    description:
      'Chewy brown rice cakes served with freshly grated coconut.',
    price: 5,
    unit: 'piece',
    stock: 100,
    image: kutsinta,
  },
  {
    id: 'cookies',
    name: 'Cookies',
    description:
      'Homemade chewy chocolate chip cookies. Soft center, crisp edges.',
    price: 10,
    unit: 'piece',
    stock: 50,
    image: cookies,
  },
  {
    id: 'crinkles',
    name: 'Crinkles',
    description:
      'Fudgy chocolate crinkles dusted with powdered sugar. Melt-in-your-mouth goodness.',
    price: 8,
    unit: 'piece',
    stock: 60,
    image: crinkles,
  },
  {
    id: 'polvoron',
    name: 'Polvoron',
    description:
      'Traditional Filipino shortbread made with toasted flour, butter, and milk.',
    price: 5,
    unit: 'piece',
    stock: 70,
    image: polvoron,
  },
];

// Contact info — edit your details here.
export const CONTACT = {
  messengerUsername: 'rackyroadt',
  businessName: 'Yan Sweet Corner',
  hours: 'Daily, 9:00 AM – 7:00 PM',
  location: 'Cagayan de Oro, Philippines',
};