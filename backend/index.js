require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS setup for dev — allow all origins
const corsOptions = {
  origin: '*',
};

// ✅ Middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Import routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const checkoutRouter = require('./routes/checkout');

// ✅ Use routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/checkout', checkoutRouter);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Barrel Exchange API is live');
});

// ✅ Global error logging (dev helper)
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Promise Rejection:', err);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
