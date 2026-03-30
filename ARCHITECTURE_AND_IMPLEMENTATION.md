# Microservices Architecture - Complete Implementation Guide

## System Architecture

```
┌─────────────────┐
│   Client/       │
│   Postman       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│   API Gateway (Port 3000)   │
│   http://localhost:3000     │
└────────────────────────────┐
│                            │
├─────────────┬──────────────┼─────────────┬────────────────┐
│             │              │             │                │
▼             ▼              ▼             ▼                ▼
/api/users    /api/rest.     /api/menu     /api/orders
│             │              │             │
▼             ▼              ▼             ▼
User Service  Restaurant     Menu Service  Order Service
(Port 3001)   Service        (Port 3003)   (Port 3004)
              (Port 3002)
│             │              │             │
▼             ▼              ▼             ▼
user-db       restaurant-db  menu-db       order-db
(MongoDB)     (MongoDB)      (MongoDB)     (MongoDB)
```

## Team Member Assignments & Implementation Status

| Member | Service | Port | Responsibility | Status |
|--------|---------|------|-----------------|--------|
| Member 1 | user-service | 3001 | Manage users (registration, profile) | ✓ Complete |
| Member 2 | **restaurant-service** | **3002** | **Manage restaurants** | **✓ Complete** |
| Member 3 | menu-service | 3003 | Manage food items/menu | ✓ Complete |
| Member 4 | order-service | 3004 | Manage orders | ✓ Complete |
| — | api-gateway | 3000 | Route all requests | ✓ Complete |

---

## Restaurant Service - Complete Implementation (Your Component)

### Project Structure
```
restaurant-service/
├── package.json           # Dependencies & scripts
├── config/
│   └── db.js              # MongoDB connection
├── src/
│   ├── index.js           # Express server & Swagger setup
│   ├── controllers/
│   │   └── restaurantController.js   # Business logic
│   ├── models/
│   │   └── Restaurant.js   # MongoDB schema
│   └── routes/
│       └── restaurantRoutes.js  # API endpoints with Swagger docs
└── .env                   # Environment variables
```

### Restaurant Model Schema
```javascript
{
  _id: ObjectId,                          // Auto-generated MongoDB ID
  name: String (required, trim),          // e.g., "Spice Garden"
  address: String (required),             // e.g., "45 Main Street, Colombo"
  cuisine: String (required),             // e.g., "Sri Lankan", "Italian", "Chinese"
  phone: String (optional),               // e.g., "+94771234567"
  isOpen: Boolean (default: true),        // Current status
  createdAt: Date (auto),                 // Timestamp
  updatedAt: Date (auto)                  // Timestamp
}
```

### API Endpoints (Restaurant Service)

#### 1. Get All Restaurants
```
GET /api/restaurants
Response: 200 OK
[
  {
    "_id": "6630f1b2e4b0c12a3c4d5e6f",
    "name": "Spice Garden",
    "address": "45 Main Street, Colombo",
    "cuisine": "Sri Lankan",
    "phone": "+94771234567",
    "isOpen": true,
    "createdAt": "2024-03-30T10:30:00.000Z",
    "updatedAt": "2024-03-30T10:30:00.000Z"
  }
]
```

#### 2. Get Restaurant by ID
```
GET /api/restaurants/:id
Response: 200 OK (or 404 if not found)
{
  "_id": "6630f1b2e4b0c12a3c4d5e6f",
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true,
  "createdAt": "2024-03-30T10:30:00.000Z",
  "updatedAt": "2024-03-30T10:30:00.000Z"
}
```

#### 3. Create New Restaurant
```
POST /api/restaurants
Content-Type: application/json

Request Body:
{
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true
}

Response: 201 Created
{
  "_id": "6630f1b2e4b0c12a3c4d5e6f",
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true,
  "createdAt": "2024-03-30T10:30:00.000Z",
  "updatedAt": "2024-03-30T10:30:00.000Z"
}
```

#### 4. Update Restaurant
```
PUT /api/restaurants/:id
Content-Type: application/json

Request Body (all fields optional):
{
  "name": "Updated Name",
  "address": "New Address",
  "cuisine": "Italian",
  "phone": "+94771234567",
  "isOpen": false
}

Response: 200 OK
{
  "_id": "6630f1b2e4b0c12a3c4d5e6f",
  "name": "Updated Name",
  "address": "New Address",
  "cuisine": "Italian",
  "phone": "+94771234567",
  "isOpen": false,
  "createdAt": "2024-03-30T10:30:00.000Z",
  "updatedAt": "2024-03-30T11:00:00.000Z"
}
```

#### 5. Delete Restaurant
```
DELETE /api/restaurants/:id
Response: 200 OK
{
  "message": "Restaurant deleted successfully"
}
```

---

## All Services - Complete Implementation

### User Service (Member 1)
**Port:** 3001 | **Route:** `/api/users`

**Endpoints:**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**User Model:**
```javascript
{
  name: String (required),
  phone: String (required),
  email: String (required, unique, lowercase),
  password: String (required),
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  timestamps: true
}
```

**Swagger Docs:** `http://localhost:3001/api-docs`

---

### Menu Service (Member 3)
**Port:** 3003 | **Route:** `/api/menu`

**Endpoints:**
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

**MenuItem Model:**
```javascript
{
  restaurantId: String (required),
  name: String (required),
  description: String (optional),
  price: Number (required, min: 0),
  category: String (required),
  isAvailable: Boolean (default: true),
  timestamps: true
}
```

**Swagger Docs:** `http://localhost:3003/api-docs`

---

### Order Service (Member 4)
**Port:** 3004 | **Route:** `/api/orders`

**Endpoints:**
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

**Order Model:**
```javascript
{
  userId: String (required),
  restaurantId: String (required),
  items: [{
    menuItemId: String,
    name: String,
    quantity: Number (min: 1),
    price: Number
  }],
  totalAmount: Number (required),
  status: String (enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']),
  deliveryAddress: String (required),
  timestamps: true
}
```

**Swagger Docs:** `http://localhost:3004/api-docs`

---

## API Gateway (Routing Layer)
**Port:** 3000

The API Gateway routes incoming requests to appropriate microservices using `http-proxy-middleware`:

```javascript
/api/users        → User Service (http://localhost:3001)
/api/restaurants  → Restaurant Service (http://localhost:3002)
/api/menu         → Menu Service (http://localhost:3003)
/api/orders       → Order Service (http://localhost:3004)
```

**Features:**
- Cross-Origin Resource Sharing (CORS) enabled
- Error handling for unavailable services
- 502 Bad Gateway responses when services are down

**Gateway Info Endpoint:**
```
GET http://localhost:3000/
Response:
{
  "service": "API Gateway",
  "status": "running",
  "port": 3000,
  "routes": {
    "users": "http://localhost:3000/api/users",
    "restaurants": "http://localhost:3000/api/restaurants",
    "menu": "http://localhost:3000/api/menu",
    "orders": "http://localhost:3000/api/orders"
  },
  "swagger": {
    "userService": "http://localhost:3001/api-docs",
    "restaurantService": "http://localhost:3002/api-docs",
    "menuService": "http://localhost:3003/api-docs",
    "orderService": "http://localhost:3004/api-docs"
  }
}
```

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Postman or curl (for API testing)

### Environment Setup

#### 1. MongoDB Setup
```bash
# Make sure MongoDB is running
mongod
```

#### 2. API Gateway (.env)
```
PORT=3000
USER_SERVICE_URL=http://localhost:3001
RESTAURANT_SERVICE_URL=http://localhost:3002
MENU_SERVICE_URL=http://localhost:3003
ORDER_SERVICE_URL=http://localhost:3004
```

#### 3. User Service (.env)
```
PORT=3001
MONGO_URI=mongodb://localhost:27017/user-db
```

#### 4. Restaurant Service (.env)
```
PORT=3002
MONGO_URI=mongodb://localhost:27017/restaurant-db
```

#### 5. Menu Service (.env)
```
PORT=3003
MONGO_URI=mongodb://localhost:27017/menu-db
```

#### 6. Order Service (.env)
```
PORT=3004
MONGO_URI=mongodb://localhost:27017/order-db
```

### Installation & Running

**Install dependencies (Run in each service directory):**
```bash
npm install
```

**Terminal 1 - API Gateway:**
```bash
cd api-gateway
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - User Service:**
```bash
cd user-service
npm install
npm run dev
# Runs on http://localhost:3001
```

**Terminal 3 - Restaurant Service (Your Component):**
```bash
cd restaurant-service
npm install
npm run dev
# Runs on http://localhost:3002
```

**Terminal 4 - Menu Service:**
```bash
cd menu-service
npm install
npm run dev
# Runs on http://localhost:3003
```

**Terminal 5 - Order Service:**
```bash
cd order-service
npm install
npm run dev
# Runs on http://localhost:3004
```

---

## Testing the APIs

### Using Postman

#### 1. Create a Restaurant
```
POST http://localhost:3000/api/restaurants
Content-Type: application/json

Body:
{
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true
}
```

#### 2. Get All Restaurants
```
GET http://localhost:3000/api/restaurants
```

#### 3. Get Restaurant by ID
```
GET http://localhost:3000/api/restaurants/{id}
```
(Replace {id} with the _id from the response)

#### 4. Update Restaurant
```
PUT http://localhost:3000/api/restaurants/{id}
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "isOpen": false
}
```

#### 5. Delete Restaurant
```
DELETE http://localhost:3000/api/restaurants/{id}
```

### Using curl

```bash
# Create Restaurant
curl -X POST http://localhost:3000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spice Garden",
    "address": "45 Main Street, Colombo",
    "cuisine": "Sri Lankan",
    "phone": "+94771234567"
  }'

# Get All Restaurants
curl http://localhost:3000/api/restaurants

# Get Restaurant by ID
curl http://localhost:3000/api/restaurants/{id}

# Update Restaurant
curl -X PUT http://localhost:3000/api/restaurants/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "New Name"}'

# Delete Restaurant
curl -X DELETE http://localhost:3000/api/restaurants/{id}
```

---

## Swagger Documentation

Access interactive API documentation:

- **User Service:** http://localhost:3001/api-docs
- **Restaurant Service:** http://localhost:3002/api-docs
- **Menu Service:** http://localhost:3003/api-docs
- **Order Service:** http://localhost:3004/api-docs

You can test all endpoints directly from the Swagger UI!

---

## Key Architecture Patterns

### 1. Microservices Separation
Each service manages its own:
- MongoDB database
- Business Logic (Controllers)
- Data Models (Mongoose schemas)
- API Routes
- Swagger documentation

### 2. API Gateway Pattern
- Single entry point for clients
- Routes requests to appropriate services
- Handles CORS
- Error handling for service failures

### 3. CRUD Operations
Each service implements standard:
- **Create (POST)** - Add new resources
- **Read (GET)** - Retrieve resources
- **Update (PUT)** - Modify resources
- **Delete (DELETE)** - Remove resources

### 4. Error Handling
All services include:
- Validation errors (400 Bad Request)
- Not found errors (404 Not Found)
- Server errors (500 Internal Server Error)
- Service unavailable errors (502 Bad Gateway)

### 5. API Documentation
- Swagger/OpenAPI specification
- Automated documentation generation
- Interactive testing interface

---

## Assignment Completion Checklist

Your restaurant-service includes all requirements:

✅ **Microservice Architecture**
- Standalone Node.js/Express service
- Separate MongoDB database
- Runs on dedicated port (3002)

✅ **Database Integration**
- MongoDB connection with mongoose
- Proper schema definition
- CRUD operations

✅ **API Gateway Integration**
- Registered in API gateway
- Proper routing configuration
- Error handling

✅ **REST API Implementation**
- Complete CRUD endpoints
- Proper HTTP methods
- JSON request/response format

✅ **Documentation**
- Swagger/OpenAPI docs
- Comprehensive API documentation
- Interactive testing

✅ **Code Structure**
- Consistent with other services
- Proper separation of concerns
- Models, Controllers, Routes pattern

---

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: MongoDB connection error
Solution: Ensure MongoDB is running (mongod command)
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3002
Solution: Kill the process using the port or change PORT in .env
```

### Service Unavailable
```
Error: Restaurant Service unavailable
Solution: Ensure the restaurant-service is running in a separate terminal
```

### CORS Errors
Already handled by API Gateway with `cors()` middleware.

---

## Deployment Considerations

For production deployment:
1. Use environment-specific .env files
2. Implement authentication (JWT tokens)
3. Add rate limiting
4. Implement logging & monitoring
5. Use cloud MongoDB (Atlas) instead of local
6. Implement service discovery
7. Add health check endpoints
8. Implement circuit breaker pattern for resilience

---

## Summary

Your microservices architecture is complete with:
- ✅ 4 Independent microservices (User, Restaurant, Menu, Order)
- ✅ API Gateway for routing
- ✅ MongoDB for data persistence
- ✅ Swagger documentation for all services
- ✅ CRUD operations for all resources
- ✅ Proper error handling
- ✅ Consistent code structure across services

All services communicate through the API Gateway, following a clean microservices pattern suitable for scalable, maintainable applications.
