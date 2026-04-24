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
      'Classic Filipino dessert with ripe mango slices, graham crackers, and sweet cream. Good for 4–6 people.',
    price: 30,
    stock: 20,
    image: mangoFloat,
  },
  {
    id: 'strawberry-float',
    name: 'Strawberry Float',
    description:
      'A sweet twist on the classic — fresh strawberries layered with graham and cream. Good for 4–6 people.',
    price: 30,
    stock: 20,
    image: strawberryFloat,
  },
  {
    id: 'berry-float',
    name: 'Berry Float',
    description:
      'Mixed berries folded into creamy graham goodness. Rich, tangy, and perfect for special occasions.',
    price: 30,
    stock: 20,
    image: berryFloat,
  },
  {
    id: 'leche-flan',
    name: 'Leche Flan',
    description:
      'Silky-smooth caramel custard made with fresh eggs and milk. Sold per llanera.',
    price: 120,
    stock: 5,
    image: lecheFlan,
  },
  {
    id: 'puto',
    name: 'Puto',
    description:
      'Soft, fluffy steamed rice cakes topped with cheese. Perfect merienda for 1 dozen pieces.',
    price: 10,
    stock: 50,
    image: puto,
  },
  {
    id: 'kutsinta',
    name: 'Kutsinta',
    description:
      'Chewy brown rice cakes served with freshly grated coconut. 1 dozen pieces per order.',
    price: 5,
    stock: 50,
    image: kutsinta,
  },
  {
    id: 'cookies',
    name: 'Cookies',
    description:
      'Homemade chewy chocolate chip cookies. Soft center, crisp edges. 10 pieces per pack.',
    price: 40,
    stock: 15,
    image: cookies,
  },
  {
    id: 'crinkles',
    name: 'Crinkles',
    description:
      'Fudgy chocolate crinkles dusted with powdered sugar. Melt-in-your-mouth. 10 pieces per pack.',
    price: 15,
    stock: 30,
    image: crinkles,
  },
  {
    id: 'polvoron',
    name: 'Polvoron',
    description:
      'Traditional Filipino shortbread made with toasted flour, butter, and milk. 12 pieces per pack.',
    price: 5,
    stock: 70,
    image: polvoron,
  },
];

// Contact info 
export const CONTACT = {
  messengerUsername: 'Jiane Rackyle Sarting',
  businessName: 'Yan Sweet Corner',
  hours: 'Daily, 9:00 AM – 7:00 PM',
  location: 'Cagayan de Oro City, Philippines',
};
