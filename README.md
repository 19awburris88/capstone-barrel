# 🥃 Barrel Exchange — MVP README

**Barrel Exchange** is a bourbon marketplace platform where collectors can:
- Explore and purchase rare bottles
- Create and manage their own listings
- Checkout securely using Stripe
- Admins can manage users, bottles, and orders through a private dashboard

This is an MVP demo version intended for development and presentation use only.

## 🚀 Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | React.js (Vite) + Material UI (MUI) |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| Payments | Stripe API (test mode) |
| Hosting | (Local Development for now) |
| Version Control | GitHub |

## 🔥 Key Features

- Public Browsing – Anyone can explore bottles.
- Stripe Integration – "Buy It Now" launches a secure checkout flow.
- Login / Register Modal – Users can create accounts and login directly from the navbar.
- User Store Management – Logged-in users can manage their own bottle listings.
- Admin Dashboard – Admins can manage users, products, and view orders.
- Protected Routes – Users and admins have separate protected areas.
- MVP Stripe Test Mode – No real payments, safe for demo.

## 📖 Setup Instructions

### ⚙️ Backend Setup

cd backend
npm install

Create a `.env` file in `backend/`:

DATABASE_URL=postgres://localhost:5432/barrelexchange
STRIPE_SECRET_KEY=sk_test_YourTestStripeKeyHere

Start backend:

npx nodemon index.js


✅ Server running at `http://localhost:3001`

### ⚙️ Frontend Setup

cd frontend
npm install
npm run dev

✅ Vite app running at `http://localhost:5173`

## 🛠️ Seeding Database

cd backend
psql -d barrelexchange < schema.sql
node seed.js

✅ This will create tables, users, and bottles for demo purposes.

## 🔐 Important Accounts

| Type | Login |
|---|---|
| Admin | email: `admin@barrelexchange.com` / password: `admin123` |
| Regular User | Use Navbar Modal to Register/Login |

## ⚠️ Notes

- Stripe is in Test Mode**: No real money is involved.
- env file is ignored from Git for security.
- GitHub Push Protection**: Secrets cannot be pushed.

## 🎯 Future Improvements

- Save real orders to database after Stripe success
- Add email notifications for orders
- Add profile settings page
- Deploy frontend + backend to production
- Move CORS & API URLs to environment variables

# 🙌 Thanks for Checking Out Barrel Exchange!

> For rare finds. For rare people. 🥃

