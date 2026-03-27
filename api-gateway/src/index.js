require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const RESTAURANT_SERVICE_URL = process.env.RESTAURANT_SERVICE_URL || 'http://localhost:3002';
const MENU_SERVICE_URL = process.env.MENU_SERVICE_URL || 'http://localhost:3003';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3004';

app.get('/', (req, res) => {
  res.json({
    service: 'API Gateway',
    status: 'running',
    port: PORT,
    routes: {
      users: `http://localhost:${PORT}/api/users`,
      restaurants: `http://localhost:${PORT}/api/restaurants`,
      menu: `http://localhost:${PORT}/api/menu`,
      orders: `http://localhost:${PORT}/api/orders`,
    },
    swagger: {
      userService: `${USER_SERVICE_URL}/api-docs`,
      restaurantService: `${RESTAURANT_SERVICE_URL}/api-docs`,
      menuService: `${MENU_SERVICE_URL}/api-docs`,
      orderService: `${ORDER_SERVICE_URL}/api-docs`,
    },
  });
});

app.use(
  '/api/users',
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: 'User Service unavailable', error: err.message });
      },
    },
  })
);

app.use(
  '/api/restaurants',
  createProxyMiddleware({
    target: RESTAURANT_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: 'Restaurant Service unavailable', error: err.message });
      },
    },
  })
);

app.use(
  '/api/menu',
  createProxyMiddleware({
    target: MENU_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: 'Menu Service unavailable', error: err.message });
      },
    },
  })
);

app.use(
  '/api/orders',
  createProxyMiddleware({
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({ message: 'Order Service unavailable', error: err.message });
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log(`  /api/users        -> ${USER_SERVICE_URL}`);
  console.log(`  /api/restaurants  -> ${RESTAURANT_SERVICE_URL}`);
  console.log(`  /api/menu         -> ${MENU_SERVICE_URL}`);
  console.log(`  /api/orders       -> ${ORDER_SERVICE_URL}`);
});
