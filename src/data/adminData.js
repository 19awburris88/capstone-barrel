import { faker } from '@faker-js/faker';

// 🔢 Stats for summary cards
export const stats = {
  totalProducts: 32,
  totalUsers: 4,
  totalOrders: 4,
};

// 🍾 Dynamically generated bottle data
export const products = Array.from({ length: 32 }).map(() => ({
  name: `${faker.commerce.productName()} Bourbon`,
  description: faker.commerce.productDescription(),
  image: `https://source.unsplash.com/300x400/?bourbon,${faker.word.noun()}`,
  price: `$${faker.commerce.price({ min: 45, max: 200, dec: 2 })}`,
  proof: faker.number.int({ min: 80, max: 140 }).toString(),
  seller: faker.person.fullName(),
}));

// 👥 Static user list for dashboard
export const users = [
  { name: 'John Doe', email: 'johndoe@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'janesmith@example.com', role: 'User' },
  { name: 'David Johnson', email: 'davidjohnson@example.com', role: 'User' },
  { name: 'Emily Brown', email: 'emilybrown@example.com', role: 'User' },
];

// 🧾 Static order list for dashboard
export const orders = [
  { order: '#1001', user: 'Jane Smith', status: 'Completed' },
  { order: '#1002', user: 'David Johnson', status: 'Processing' },
  { order: '#1003', user: 'John Doe', status: 'Completed' },
  { order: '#1004', user: 'Emily Brown', status: 'Pending' },
];
