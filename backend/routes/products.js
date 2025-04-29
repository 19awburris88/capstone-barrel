const express = require('express');
const router = express.Router();
const client = require('../db/client');

// GET /api/products — All bottles
router.get('/', async (req, res) => {
  try {
    const { rows } = await client.query(`
      SELECT 
        id,
        name,
        price,
        proof,
        image,
        seller_id
      FROM products
      ORDER BY name ASC
    `);

    // Ensure fields are consistent (e.g., strings)
    const formatted = rows.map((product) => ({
      ...product,
      price: product.price.toString(),
      proof: product.proof.toString(),
    }));

    res.json(formatted);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
