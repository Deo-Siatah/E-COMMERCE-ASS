# 🚗 Mara Dealers — Car E-Commerce Platform

A full-stack car marketplace web application where users can browse, list, buy, and manage vehicle listings. Built with a React frontend and a Node.js/Express/MongoDB backend.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Cars](#cars)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Users](#users)
- [Data Models](#data-models)
- [Pages & Routes](#pages--routes)

---

## ✨ Features

- **User Authentication** — Secure signup/login with JWT-based session management
- **Car Listings** — Create, read, update, and delete vehicle listings with rich details (make, model, year, price, fuel type, transmission, mileage, images)
- **Browse & Search** — Filter inventory by make, model, year, and condition; paginated results
- **Car Details** — Detailed individual vehicle pages with seller information
- **Shopping Cart / Watchlist** — Add or remove vehicles; persistent per-user cart
- **Order / Checkout** — Place purchase orders, mark cars as sold, auto-remove from cart
- **User Profile** — View and update account information and full purchase history
- **Inventory Management** — Authenticated sellers can manage their listings via a dedicated dashboard
- **Dark / Light Mode** — Theme toggle persisted in `localStorage`
- **Toast Notifications** — Real-time feedback using Sonner

---

## 🛠 Tech Stack

### Frontend (`/Client`)
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Axios | HTTP client |
| Lucide React | Icon library |
| Sonner | Toast notifications |

### Backend (`/Server`)
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 9 | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing |
| nodemon | Development hot-reload |

---

## 📁 Project Structure

```
E-COMMERCE-ASS/
├── Client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/                # Axios API call functions
│   │   │   ├── axios.js        # Axios instance with base URL
│   │   │   ├── auth.js
│   │   │   ├── cars.js
│   │   │   ├── cart.js
│   │   │   ├── order.js
│   │   │   └── user.js
│   │   ├── components/         # Shared UI components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Page-level components
│   │   │   ├── Homepage.jsx    # Hero section + featured cars
│   │   │   ├── Inventory.jsx   # Browsable car listings
│   │   │   ├── CarDetails.jsx  # Single car detail page
│   │   │   ├── Cart.jsx        # User cart / watchlist
│   │   │   ├── Orders.jsx      # Purchase history
│   │   │   ├── Profile.jsx     # User profile & settings
│   │   │   ├── Services.jsx    # Inventory management dashboard
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx             # Root app with routing & auth state
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Server/                     # Express backend
    ├── controllers/            # Route handler logic
    │   ├── authController.js
    │   ├── carController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   └── userController.js
    ├── middleware/
    │   └── authMiddleware.js   # JWT verification middleware
    ├── models/                 # Mongoose schemas
    │   ├── Car.js
    │   ├── CartDetails.js
    │   ├── Order.js
    │   └── UserProfile.js
    ├── routes/                 # Express routers
    │   ├── authroutes.js
    │   ├── carroutes.js
    │   ├── cartroutes.js
    │   ├── orderroutes.js
    │   └── userroutes.js
    ├── server.js               # App entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **pnpm** (recommended) or npm
- **MongoDB** — a running instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### Environment Variables

#### Backend (`Server/.env`)

Create a `.env` file inside the `Server/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_jwt_key
```

#### Frontend (`Client/.env`)

Create a `.env` file inside the `Client/` directory (optional — defaults to `http://localhost:5000`):

```env
VITE_API_URL=http://localhost:5000
```

### Installation

```bash
# Install backend dependencies
cd Server
pnpm install

# Install frontend dependencies
cd ../Client
pnpm install
```

### Running the App

**Start the backend server** (runs on port 5000):
```bash
cd Server
pnpm dev
```

**Start the frontend dev server** (runs on port 5173 or 5174):
```bash
cd Client
pnpm dev
```

Open your browser at `http://localhost:5173`.

---

## 📡 API Reference

All API routes are prefixed with `/api/v1`. Routes marked with 🔒 require a `Bearer <token>` in the `Authorization` header.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/signup` | Register a new user |
| `POST` | `/api/v1/login` | Login and receive a JWT |

**Signup request body:**
```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login request body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### Cars

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/cars` | — | Get all cars (paginated, filterable) |
| `GET` | `/api/v1/cars?latest=true` | — | Get the 6 most recent listings |
| `GET` | `/api/v1/cars/:id` | — | Get a single car with seller info |
| `POST` | `/api/v1/cars` | 🔒 | Create a new car listing |
| `PATCH` | `/api/v1/cars/:id` | 🔒 | Update own car listing |
| `DELETE` | `/api/v1/cars/:id` | 🔒 | Delete own car listing |

**Query parameters for `GET /api/v1/cars`:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `make` | string | Filter by make (case-insensitive) |
| `model` | string | Filter by model (case-insensitive) |
| `year` | number | Filter by year |
| `condition` | string | `New` or `Used` |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Results per page (default: `10`) |
| `latest` | boolean | Return the 6 latest cars |

---

### Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/carts` | 🔒 | Add a car to cart |
| `GET` | `/api/v1/carts` | 🔒 | Get the logged-in user's cart |
| `DELETE` | `/api/v1/carts/:carId` | 🔒 | Remove a specific car from cart |
| `DELETE` | `/api/v1/carts` | 🔒 | Clear the entire cart |

---

### Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/orders` | 🔒 | Create a purchase order (checkout) |
| `GET` | `/api/v1/orders` | 🔒 | Get all orders for the logged-in user |

**Create order request body:**
```json
{
  "carId": "<car_id>",
  "amountPaid": 25000,
  "transactionId": "txn_abc123"
}
```

---

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/v1/users/:id` | 🔒 | Get profile + purchase history |
| `PATCH` | `/api/v1/users/:id` | 🔒 | Update username or email |

---

## 🗄 Data Models

### UserProfile
| Field | Type | Notes |
|-------|------|-------|
| `username` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, hashed with bcrypt |

### Car
| Field | Type | Notes |
|-------|------|-------|
| `make` | String | Required (e.g., Toyota) |
| `model` | String | Required (e.g., Camry) |
| `year` | Number | Required |
| `price` | Number | Required |
| `description` | String | Required |
| `images` | [String] | Array of image URLs |
| `condition` | String | `New` \| `Used` |
| `fuelType` | String | `Petrol` \| `Diesel` \| `Electric` \| `Hybrid` |
| `mileage` | Number | |
| `transmission` | String | `Manual` \| `Automatic` |
| `seller` | ObjectId | Ref: UserProfile |
| `isSold` | Boolean | Default: `false` |

### Cart
| Field | Type | Notes |
|-------|------|-------|
| `user` | ObjectId | Ref: UserProfile |
| `items` | Array | Array of `{ car: ObjectId, addedAt: Date }` |

### Order
| Field | Type | Notes |
|-------|------|-------|
| `buyer` | ObjectId | Ref: UserProfile |
| `car` | ObjectId | Ref: Car |
| `amountPaid` | Number | Required |
| `paymentStatus` | String | `Pending` \| `Completed` \| `Failed` |
| `transactionId` | String | |

---

## 🖥 Pages & Routes

| Path | Page | Auth Required |
|------|------|---------------|
| `/` | Homepage — hero section + featured cars | No |
| `/cars` | Inventory — browse & filter all cars | No |
| `/cars/:id` | Car Details — full info + add to cart | No |
| `/cart` | Cart — watchlist / saved vehicles | No |
| `/login` | Login | No (redirects if logged in) |
| `/signup` | Signup | No (redirects if logged in) |
| `/profile` | User Profile — info & purchase history | ✅ Yes |
| `/orders` | Orders — purchase history | ✅ Yes |
| `/manage` | Services — inventory management dashboard | ✅ Yes |
