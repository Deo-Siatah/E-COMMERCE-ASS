# Mara Dealers — Car E-Commerce Platform

A full-stack web application for buying and selling vehicles. **Mara Dealers** provides a premium automotive marketplace experience with a React frontend and a Node.js/Express REST API backed by MongoDB.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Cars](#cars)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Users](#users)
- [Pages & Routes](#pages--routes)
- [Data Models](#data-models)

---

## Overview

Mara Dealers is a car marketplace where users can:

- Browse the full vehicle inventory (no login required).
- Register and log in to access protected features.
- Add vehicles to a personal cart and place orders.
- Manage their own profile.
- Create, update, and delete car listings through an authenticated inventory management dashboard.

---

## Features

| Feature | Description |
|---|---|
| **Authentication** | JWT-based signup and login with bcrypt password hashing |
| **Car Inventory** | Browse, search and view detailed information for all listed vehicles |
| **Car Management** | Authenticated sellers can create, edit, and delete their own listings |
| **Shopping Cart** | Add cars to a persistent cart; remove individual items or clear the cart |
| **Orders** | Place orders for vehicles and view order history |
| **User Profile** | View and update personal account details |
| **Dark Mode** | Full light/dark theme toggle persisted in `localStorage` |
| **Responsive UI** | Mobile-friendly layout built with Tailwind CSS v4 |
| **Toast Notifications** | Real-time feedback using the Sonner library |

---

## Tech Stack

### Frontend (`/Client`)

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Axios](https://axios-http.com/) | HTTP client |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Lucide React](https://lucide.dev/) | Icon library |

### Backend (`/Server`)

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express 5](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) + [Mongoose 9](https://mongoosejs.com/) | Database & ODM |
| [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken) | Stateless authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [cors](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [nodemon](https://nodemon.io/) | Dev server auto-reload |

---

## Project Structure

```
E-COMMERCE-ASS/
├── Client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── api/              # Axios API helper functions
│   │   │   ├── auth.js
│   │   │   ├── axios.js      # Configured Axios instance
│   │   │   ├── cars.js
│   │   │   ├── cart.js
│   │   │   ├── order.js
│   │   │   └── user.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Homepage.jsx  # Landing page with featured cars
│   │   │   ├── Inventory.jsx # Full car listing / browse page
│   │   │   ├── CarDetails.jsx# Single car detail view
│   │   │   ├── Cart.jsx      # Shopping cart
│   │   │   ├── Orders.jsx    # Order history
│   │   │   ├── Services.jsx  # Inventory management dashboard (auth)
│   │   │   ├── Profile.jsx   # User profile
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx           # Root component with routing
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── Server/                   # Express backend
    ├── controllers/
    │   ├── authController.js
    │   ├── carController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   └── userController.js
    ├── middleware/
    │   └── authMiddleware.js  # JWT protect middleware
    ├── models/
    │   ├── Car.js
    │   ├── CartDetails.js
    │   ├── Order.js
    │   └── UserProfile.js
    ├── routes/
    │   ├── authroutes.js
    │   ├── carroutes.js
    │   ├── cartroutes.js
    │   ├── orderroutes.js
    │   └── userroutes.js
    ├── server.js
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **pnpm** (or npm/yarn)
- A running **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Backend Setup

```bash
cd Server
pnpm install        # install dependencies
```

Create a `.env` file in the `Server/` directory (see [Environment Variables](#environment-variables)), then start the dev server:

```bash
pnpm dev            # starts nodemon on port 5000
```

### Frontend Setup

```bash
cd Client
pnpm install        # install dependencies
pnpm dev            # starts Vite dev server (default: http://localhost:5173)
```

The frontend is pre-configured to allow origins on `http://localhost:5173` and `http://localhost:5174`.

---

## Environment Variables

Create a `.env` file inside the `Server/` directory with the following keys:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_key
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |

---

## API Reference

All API routes are prefixed with `/api/v1`. Protected routes require an `Authorization: Bearer <token>` header.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/signup` | No | Register a new user |
| `POST` | `/api/v1/login` | No | Log in and receive a JWT |

**Signup body:**
```json
{ "username": "string", "email": "string", "password": "string" }
```

**Login body:**
```json
{ "email": "string", "password": "string" }
```

---

### Cars

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/cars` | No | Retrieve all car listings |
| `GET` | `/api/v1/cars/:id` | No | Retrieve a single car by ID |
| `POST` | `/api/v1/cars` | **Yes** | Create a new car listing |
| `PATCH` | `/api/v1/cars/:id` | **Yes** | Update an existing listing |
| `DELETE` | `/api/v1/cars/:id` | **Yes** | Delete a listing |

---

### Cart

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/carts` | **Yes** | Get the authenticated user's cart |
| `POST` | `/api/v1/carts` | **Yes** | Add a car to the cart |
| `DELETE` | `/api/v1/carts/:carId` | **Yes** | Remove a specific car from the cart |
| `DELETE` | `/api/v1/carts` | **Yes** | Clear the entire cart |

---

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/orders` | **Yes** | Place a new order |
| `GET` | `/api/v1/orders` | **Yes** | Get all orders for the authenticated user |

---

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/users/:id` | **Yes** | Get a user's profile |
| `PATCH` | `/api/v1/users/:id` | **Yes** | Update a user's profile |

---

## Pages & Routes

| Path | Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Homepage` | No | Landing page with featured cars and hero section |
| `/cars` | `Inventory` | No | Full browsable car inventory |
| `/cars/:id` | `CarDetails` | No | Detailed view for a single car |
| `/cart` | `Cart` | No | Shopping cart |
| `/login` | `Login` | No (redirects if logged in) | Login form |
| `/signup` | `Signup` | No (redirects if logged in) | Registration form |
| `/manage` | `Services` | **Yes** | Inventory management dashboard |
| `/orders` | `Orders` | **Yes** | Order history |
| `/profile` | `Profile` | **Yes** | User profile page |

---

## Data Models

### User

| Field | Type | Notes |
|---|---|---|
| `username` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, stored as bcrypt hash |

### Car

| Field | Type | Notes |
|---|---|---|
| `make` | String | Required (e.g., Toyota) |
| `model` | String | Required (e.g., Camry) |
| `year` | Number | Required |
| `price` | Number | Required |
| `description` | String | Required |
| `images` | [String] | Array of image URLs |
| `condition` | String | `New` or `Used` (default: `Used`) |
| `fuelType` | String | `Petrol`, `Diesel`, `Electric`, or `Hybrid` |
| `mileage` | Number | |
| `transmission` | String | `Manual` or `Automatic` |
| `seller` | ObjectId | Ref: `UserProfile` |
| `isSold` | Boolean | Default: `false` |

### Cart

| Field | Type | Notes |
|---|---|---|
| `user` | ObjectId | Ref: `User` |
| `items` | Array | Each item contains a `car` (ObjectId) and `addedAt` (Date) |

### Order

| Field | Type | Notes |
|---|---|---|
| `buyer` | ObjectId | Ref: `UserProfile` |
| `car` | ObjectId | Ref: `Car` |
| `amountPaid` | Number | Required |
| `paymentStatus` | String | `Pending`, `Completed`, or `Failed` (default: `Pending`) |
| `transactionId` | String | Optional |
