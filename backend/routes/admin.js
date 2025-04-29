const express = require('express');
const router = express.Router();

// Example: GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    // Example: Fetch users from a database (e.g., Prisma, Mongo, etc.)
    const users = await prisma.user.findMany(); // assuming Prisma client
    res.json(users);
  } catch (err) {
    console.error('Admin user fetch failed:', err);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// Example: GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalListings = await prisma.bottle.count();
    const totalOrders = await prisma.order.count();

    res.json({
      totalUsers,
      totalListings,
      totalOrders,
    });
  } catch (err) {
    console.error('Admin stats failed:', err);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

module.exports = router;
