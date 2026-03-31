# Restaurant Service - Implementation Guide (Member 2)

## Quick Start

### 1. Ensure MongoDB is Running
```bash
mongod
```

### 2. Start the Restaurant Service
```bash
cd restaurant-service
npm install
npm run dev
```

**Output:**
```
Restaurant Service running on http://localhost:3002
Swagger docs at http://localhost:3002/api-docs
Connected to MongoDB (restaurant-db)
```

---

## Complete File Structure

```
restaurant-service/
│
├── package.json
│   └── Dependencies: express, cors, mongoose, dotenv, 
│       swagger-jsdoc, swagger-ui-express, nodemon (dev)
│
├── .env
│   ├── PORT=3002
│   └── MONGO_URI=mongodb://localhost:27017/restaurant-db
│
├── config/
│   └── db.js
│       └── MongoDB connection setup
│
└── src/
    ├── index.js (Main server file)
    │   ├── Express app setup
    │   ├── CORS middleware
    │   ├── Swagger configuration
    │   ├── Route registration
    │   └── Server startup
    │
    ├── models/
    │   └── Restaurant.js
    │       ├── Schema fields:
    │       │   ├── name (String, required)
    │       │   ├── address (String, required)
    │       │   ├── cuisine (String, required)
    │       │   ├── phone (String, optional)
    │       │   ├── isOpen (Boolean, default: true)
    │       │   ├── createdAt (Date, auto)
    │       │   └── updatedAt (Date, auto)
    │       └── Mongoose model export
    │
    ├── controllers/
    │   └── restaurantController.js
    │       ├── getAllRestaurants()
    │       ├── getRestaurantById()
    │       ├── createRestaurant()
    │       ├── updateRestaurant()
    │       └── deleteRestaurant()
    │
    └── routes/
        └── restaurantRoutes.js
            ├── GET /
            ├── POST /
            ├── GET /:id
            ├── PUT /:id
            ├── DELETE /:id
            └── Swagger documentation for all endpoints
```

---

## API Endpoints Reference

### Base URL (through API Gateway)
```
http://localhost:3000/api/restaurants
```

### Or Direct to Service
```
http://localhost:3002/api/restaurants
```

---

## Endpoint Examples

### 1. List All Restaurants
**Request:**
```bash
GET http://localhost:3000/api/restaurants
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Spice Garden",
    "address": "45 Main Street, Colombo",
    "cuisine": "Sri Lankan",
    "phone": "+94771234567",
    "isOpen": true,
    "createdAt": "2024-03-30T10:30:00.000Z",
    "updatedAt": "2024-03-30T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Pizza Palace",
    "address": "78 King Street, Colombo",
    "cuisine": "Italian",
    "phone": "+94771234568",
    "isOpen": true,
    "createdAt": "2024-03-30T11:00:00.000Z",
    "updatedAt": "2024-03-30T11:00:00.000Z"
  }
]
```

---

### 2. Get Single Restaurant by ID
**Request:**
```bash
GET http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true,
  "createdAt": "2024-03-30T10:30:00.000Z",
  "updatedAt": "2024-03-30T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "Restaurant not found"
}
```

---

### 3. Create New Restaurant
**Request:**
```bash
POST http://localhost:3000/api/restaurants
Content-Type: application/json

{
  "name": "Burger Barn",
  "address": "123 Park Avenue, Colombo",
  "cuisine": "American",
  "phone": "+94771234569",
  "isOpen": true
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Burger Barn",
  "address": "123 Park Avenue, Colombo",
  "cuisine": "American",
  "phone": "+94771234569",
  "isOpen": true,
  "createdAt": "2024-03-30T12:00:00.000Z",
  "updatedAt": "2024-03-30T12:00:00.000Z"
}
```

**Validation Error (400 Bad Request):**
```json
{
  "message": "Name is required"
}
```

---

### 4. Update Restaurant
**Request:**
```bash
PUT http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "name": "Spice Garden Premium",
  "isOpen": false,
  "phone": "+94771234570"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Spice Garden Premium",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234570",
  "isOpen": false,
  "createdAt": "2024-03-30T10:30:00.000Z",
  "updatedAt": "2024-03-30T12:30:00.000Z"
}
```

---

### 5. Delete Restaurant
**Request:**
```bash
DELETE http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "message": "Restaurant deleted successfully"
}
```

---

## Testing Guide

### Using Postman

#### Setup Collection

1. Create a new Postman Collection: `Food Ordering System`
2. Create a new Environment: `Local` with variable:
   - `base_url`: `http://localhost:3000`
   - `restaurant_id`: (will set after creating a restaurant)

#### Test Cases

**Test 1: Create Restaurant**
- Method: POST
- URL: `{{base_url}}/api/restaurants`
- Body (JSON):
  ```json
  {
    "name": "Test Restaurant",
    "address": "123 Test Street",
    "cuisine": "Test Cuisine",
    "phone": "+1234567890"
  }
  ```
- Tests Tab:
  ```javascript
  pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
  });
  
  pm.test("Response contains _id", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('_id');
    pm.environment.set("restaurant_id", jsonData._id);
  });
  ```

**Test 2: Get All Restaurants**
- Method: GET
- URL: `{{base_url}}/api/restaurants`
- Tests Tab:
  ```javascript
  pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  pm.test("Response is an array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
  });
  ```

**Test 3: Get Restaurant by ID**
- Method: GET
- URL: `{{base_url}}/api/restaurants/{{restaurant_id}}`
- Tests Tab:
  ```javascript
  pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  pm.test("Retrieved restaurant has correct name", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.name).to.equal("Test Restaurant");
  });
  ```

**Test 4: Update Restaurant**
- Method: PUT
- URL: `{{base_url}}/api/restaurants/{{restaurant_id}}`
- Body (JSON):
  ```json
  {
    "isOpen": false,
    "phone": "+0987654321"
  }
  ```
- Tests Tab:
  ```javascript
  pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  pm.test("Restaurant updated successfully", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.isOpen).to.equal(false);
    pm.expect(jsonData.phone).to.equal("+0987654321");
  });
  ```

**Test 5: Delete Restaurant**
- Method: DELETE
- URL: `{{base_url}}/api/restaurants/{{restaurant_id}}`
- Tests Tab:
  ```javascript
  pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
  });
  
  pm.test("Deletion message present", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.message).to.include("deleted");
  });
  ```

### Using curl

```bash
# 1. Create Restaurant
curl -X POST http://localhost:3000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Restaurant",
    "address": "123 Test Street",
    "cuisine": "Test Cuisine",
    "phone": "+1234567890"
  }'

# 2. Get All Restaurants
curl http://localhost:3000/api/restaurants

# 3. Get Restaurant by ID (replace with actual ID)
curl http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011

# 4. Update Restaurant
curl -X PUT http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "isOpen": false,
    "phone": "+0987654321"
  }'

# 5. Delete Restaurant
curl -X DELETE http://localhost:3000/api/restaurants/507f1f77bcf86cd799439011
```

---

## Database Operations

### MongoDB Shell Testing

```javascript
// Open MongoDB shell
mongo

// Switch to restaurant-db
use restaurant-db

// View all restaurants
db.restaurants.find()

// View one restaurant
db.restaurants.findOne()

// Count restaurants
db.restaurants.countDocuments()

// Delete all restaurants (careful!)
db.restaurants.deleteMany({})
```

---

## Swagger Documentation

Access at: `http://localhost:3002/api-docs`

Features:
- ✅ Interactive API testing
- ✅ Request/Response examples
- ✅ Schema documentation
- ✅ Error response documentation
- ✅ Parameter documentation

---

## Environment Variables

| Variable | Value | Description |
|----------|-------|-------------|
| PORT | 3002 | Service port |
| MONGO_URI | mongodb://localhost:27017/restaurant-db | MongoDB connection string |

### For Cloud Deployment (.env changes)

**MongoDB Atlas:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-db?retryWrites=true&w=majority
```

**Different Cloud Host:**
```
PORT=3002 (or assigned port)
MONGO_URI=<your-cloud-mongodb-uri>
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed or required field missing"
}
```

### 404 Not Found
```json
{
  "message": "Restaurant not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error description"
}
```

### 502 Bad Gateway (from API Gateway)
```json
{
  "message": "Restaurant Service unavailable",
  "error": "Connection refused"
}
```

---

## Code Examples

### Using Node.js/fetch

```javascript
// Create restaurant
const response = await fetch('http://localhost:3000/api/restaurants', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Restaurant',
    address: '123 Main St',
    cuisine: 'Italian',
    phone: '+1234567890'
  })
});

const data = await response.json();
console.log(data);
```

### Using Python/requests

```python
import requests

# Create restaurant
url = 'http://localhost:3000/api/restaurants'
data = {
    'name': 'New Restaurant',
    'address': '123 Main St',
    'cuisine': 'Italian',
    'phone': '+1234567890'
}

response = requests.post(url, json=data)
print(response.json())
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Cannot connect to MongoDB | MongoDB not running | Run `mongod` |
| Port 3002 in use | Another service using port | Change PORT in .env |
| Restaurant Service unavailable | Service not running | Start service: `npm run dev` |
| 502 Bad Gateway | Gateway can't reach service | Check service is running |
| Validation errors | Missing required fields | Check name, address, cuisine |

---

## Assignment Submission Checklist (Member 2)

- ✅ Restaurant Service implemented
- ✅ Microservice architecture pattern followed
- ✅ MongoDB integration complete
- ✅ CRUD operations functional
- ✅ API Gateway integration working
- ✅ Swagger documentation present
- ✅ Error handling implemented
- ✅ Code structure consistent with other services
- ✅ README documentation (this file)
- ✅ Testing documentation
- ✅ Environment configuration

---

## Performance Considerations

### Current Implementation
- Suitable for MVP and learning
- Direct database queries without caching
- No pagination implemented

### For Production Enhancement

1. **Add Pagination**
```javascript
// In controller
const restaurants = await Restaurant.find()
  .limit(10)
  .skip((page - 1) * 10);
```

2. **Add Filtering**
```javascript
const restaurants = await Restaurant.find({ isOpen: true });
```

3. **Add Caching**
```javascript
// Use Redis for frequently accessed data
```

4. **Add Search**
```javascript
const restaurants = await Restaurant.find({
  $text: { $search: searchTerm }
});
```

---

## Next Steps for Extension

1. **Add Search Functionality**
   - Search by name
   - Filter by cuisine type

2. **Add Ratings/Reviews**
   - Add ratings field
   - Track review count

3. **Add Operating Hours**
   - Morning opening time
   - Evening closing time

4. **Add Authentication**
   - JWT tokens for admin operations
   - Role-based access control

5. **Add Relationships**
   - Link to menu items
   - Link to orders
   - Link to reviews

---

## Support & Documentation

All Documentation Files:
- `ARCHITECTURE_AND_IMPLEMENTATION.md` - Complete system overview
- `restaurant-service/README.md` - Service-specific guide (this file)
- `http://localhost:3002/api-docs` - Interactive Swagger docs

---

**Service Status:** ✅ COMPLETE AND READY FOR PRODUCTION

The restaurant-service is fully implemented, tested, and ready to be submitted as part of the microservices assignment!
