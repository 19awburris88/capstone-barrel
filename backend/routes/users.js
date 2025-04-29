const express = require('express');
const router = express.Router();
const client = require('../db/client');

// GET /api/users — Fetch all users
router.get('/', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM users ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id — Update user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, location, bio, avatar_url } = req.body;

  try {
    const { rows } = await client.query(
      `
      UPDATE users
      SET name = $1, location = $2, bio = $3, avatar_url = $4
      WHERE id = $5
      RETURNING *;
      `,
      [name, location, bio, avatar_url, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id — Delete user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const { rows } = await client.query(
      'DELETE FROM users WHERE id = $1 RETURNING *;',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deleted: rows[0] });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
