# MTIT - Online Food Ordering System
### IT4020 Modern Topics in IT | Assignment 2 | Group Project

A microservices-based backend for an online food ordering system built with **Node.js**, **Express**, and **MongoDB**.

---

## Architecture

```
Client / Postman
      │
      ▼
API Gateway  (port 3000)
      │
      ├──  /api/users         ──▶  User Service        (port 3001)  ──▶  MongoDB user-db
      ├──  /api/restaurants   ──▶  Restaurant Service  (port 3002)  ──▶  MongoDB restaurant-db
      ├──  /api/menu          ──▶  Menu Service        (port 3003)  ──▶  MongoDB menu-db
      └──  /api/orders        ──▶  Order Service       (port 3004)  ──▶  MongoDB order-db
```

---

## Team & Microservices

| Member   | Service              | Port | Responsibility        |
|----------|----------------------|------|-----------------------|
| Member 1 | user-service         | 3001 | Manage users          |
| Member 2 | restaurant-service   | 3002 | Manage restaurants    |
| Member 3 | menu-service         | 3003 | Manage food items     |
| Member 4 | order-service        | 3004 | Manage orders         |
| —        | api-gateway          | 3000 | Route all requests    |

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port 27017)
  - **Or** create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and use the connection string

---

## Getting Started

### Step 1 – Clone the repository

```bash
git clone <repository-url>
cd MTIT
```

### Step 2 – Start MongoDB

Make sure MongoDB is running locally:

```bash
# Windows (if installed as a service, it starts automatically)
# Otherwise start manually:
mongod
```

Or update the `MONGO_URI` in the relevant `.env` file to use your MongoDB Atlas connection string.

---

## Running Individual Services

Each member only needs to run their own service.

### Member 1 – User Service

```bash
cd user-service
npm install
npm run dev
```

- API base: `http://localhost:3001/api/users`
- Swagger UI: `http://localhost:3001/api-docs`

### Member 2 – Restaurant Service

```bash
cd restaurant-service
npm install
npm run dev
```

- API base: `http://localhost:3002/api/restaurants`
- Swagger UI: `http://localhost:3002/api-docs`

### Member 3 – Menu Service

```bash
cd menu-service
npm install
npm run dev
```

- API base: `http://localhost:3003/api/menu`
- Swagger UI: `http://localhost:3003/api-docs`

### Member 4 – Order Service

```bash
cd order-service
npm install
npm run dev
```

- API base: `http://localhost:3004/api/orders`
- Swagger UI: `http://localhost:3004/api-docs`

---

## Running the API Gateway

The API Gateway must be started **after** at least one service is running. It routes requests to all services on a single port (3000).

```bash
cd api-gateway
npm install
npm run dev
```

- Gateway base URL: `http://localhost:3000`
- Access all services through:
  - `http://localhost:3000/api/users`
  - `http://localhost:3000/api/restaurants`
  - `http://localhost:3000/api/menu`
  - `http://localhost:3000/api/orders`

---

## Running All Services Together (Full Stack)

Open **5 separate terminal windows** and run each service:

```bash
# Terminal 1 – API Gateway
cd api-gateway && npm install && npm run dev

# Terminal 2 – User Service
cd user-service && npm install && npm run dev

# Terminal 3 – Restaurant Service
cd restaurant-service && npm install && npm run dev

# Terminal 4 – Menu Service
cd menu-service && npm install && npm run dev

# Terminal 5 – Order Service
cd order-service && npm install && npm run dev
```

---

## API Endpoints Summary

### User Service (`/api/users`)
| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| GET    | /api/users       | Get all users     |
| GET    | /api/users/:id   | Get user by ID    |
| POST   | /api/users       | Create user       |
| PUT    | /api/users/:id   | Update user       |
| DELETE | /api/users/:id   | Delete user       |

### Restaurant Service (`/api/restaurants`)
| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| GET    | /api/restaurants        | Get all restaurants    |
| GET    | /api/restaurants/:id    | Get restaurant by ID   |
| POST   | /api/restaurants        | Create restaurant      |
| PUT    | /api/restaurants/:id    | Update restaurant      |
| DELETE | /api/restaurants/:id    | Delete restaurant      |

### Menu Service (`/api/menu`)
| Method | Endpoint         | Description                            |
|--------|------------------|----------------------------------------|
| GET    | /api/menu        | Get all items (filter by restaurantId) |
| GET    | /api/menu/:id    | Get item by ID                         |
| POST   | /api/menu        | Create menu item                       |
| PUT    | /api/menu/:id    | Update menu item                       |
| DELETE | /api/menu/:id    | Delete menu item                       |

### Order Service (`/api/orders`)
| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | /api/orders               | Get all orders (filter by userId)    |
| GET    | /api/orders/:id           | Get order by ID                      |
| POST   | /api/orders               | Place new order                      |
| PATCH  | /api/orders/:id/status    | Update order status                  |
| DELETE | /api/orders/:id           | Delete order                         |

---

## Swagger Documentation

Each service has its own Swagger UI for testing endpoints directly:

| Service             | Swagger URL                          |
|---------------------|--------------------------------------|
| User Service        | http://localhost:3001/api-docs       |
| Restaurant Service  | http://localhost:3002/api-docs       |
| Menu Service        | http://localhost:3003/api-docs       |
| Order Service       | http://localhost:3004/api-docs       |

---

## Environment Variables

Each service has a `.env` file. Update values as needed:

| Service             | File                        | Variables                            |
|---------------------|-----------------------------|--------------------------------------|
| User Service        | user-service/.env           | PORT=3001, MONGO_URI=...             |
| Restaurant Service  | restaurant-service/.env     | PORT=3002, MONGO_URI=...             |
| Menu Service        | menu-service/.env           | PORT=3003, MONGO_URI=...             |
| Order Service       | order-service/.env          | PORT=3004, MONGO_URI=...             |
| API Gateway         | api-gateway/.env            | PORT=3000, *_SERVICE_URL=...         |

---

## Project Structure

```
MTIT/
├── api-gateway/
│   ├── src/
│   │   └── index.js
│   ├── package.json
│   └── .env
├── user-service/
│   ├── config/db.js
│   ├── src/
│   │   ├── controllers/userController.js
│   │   ├── models/User.js
│   │   ├── routes/userRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── restaurant-service/
│   ├── config/db.js
│   ├── src/
│   │   ├── controllers/restaurantController.js
│   │   ├── models/Restaurant.js
│   │   ├── routes/restaurantRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── menu-service/
│   ├── config/db.js
│   ├── src/
│   │   ├── controllers/menuController.js
│   │   ├── models/MenuItem.js
│   │   ├── routes/menuRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── order-service/
│   ├── config/db.js
│   ├── src/
│   │   ├── controllers/orderController.js
│   │   ├── models/Order.js
│   │   ├── routes/orderRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env
└── README.md
```
