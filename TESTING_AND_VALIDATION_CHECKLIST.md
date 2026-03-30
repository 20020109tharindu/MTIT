# Microservices Testing & Validation Checklist

## Pre-Deployment Validation

### Environment Setup

- [ ] MongoDB is installed and running (`mongod` command executed)
- [ ] Node.js v14+ installed (`node --version` shows v14+)
- [ ] npm installed (`npm --version` works)
- [ ] All three MongoDB databases created:
  - `user-db`
  - `restaurant-db`
  - `menu-db`
  - `order-db`

### Repository Setup

- [ ] All services have `npm install` completed
- [ ] All `.env` files are properly configured
- [ ] No hardcoded database URLs in code
- [ ] All `.env` files are in `.gitignore`

---

## Individual Service Testing

### API Gateway (Port 3000)

**Startup Check:**
- [ ] Service starts with `npm run dev`
- [ ] Logs show: "API Gateway running on http://localhost:3000"
- [ ] All four service URLs are configured correctly in code or env

**Endpoint Tests:**
```
- [ ] GET http://localhost:3000/ → Returns gateway info
  Expected: status 200, shows all routes and swagger links
  
- [ ] GET http://localhost:3000/api/users → Routes to user-service
  Expected: status 200, array of users (or empty array)
  
- [ ] GET http://localhost:3000/api/restaurants → Routes to restaurant-service
  Expected: status 200, array of restaurants
  
- [ ] GET http://localhost:3000/api/menu → Routes to menu-service
  Expected: status 200, array of menu items
  
- [ ] GET http://localhost:3000/api/orders → Routes to order-service
  Expected: status 200, array of orders
```

---

### User Service (Port 3001)

**Startup Check:**
- [ ] Service starts with `npm run dev`
- [ ] Logs show: "User Service running on http://localhost:3001"
- [ ] Logs show: "Connected to MongoDB (user-db)"
- [ ] Swagger available at http://localhost:3001/api-docs

**CRUD Operations:**
```
1. CREATE User
   - [ ] POST /api/users with valid data → 201 Created
   - [ ] POST /api/users without name → 400 Bad Request
   - [ ] Response includes _id, timestamps

2. READ Users
   - [ ] GET /api/users → 200 OK (empty array initially)
   - [ ] GET /api/users/{id} (valid) → 200 OK
   - [ ] GET /api/users/{id} (invalid) → 404 Not Found
   - [ ] Password field NOT returned in responses

3. UPDATE User
   - [ ] PUT /api/users/{id} with partial data → 200 OK
   - [ ] PUT /api/users/{id} (invalid id) → 404 Not Found
   - [ ] Updated fields reflected in response

4. DELETE User
   - [ ] DELETE /api/users/{id} → 200 OK
   - [ ] DELETE /api/users/{id} again → 404 Not Found
   - [ ] User no longer appears in GET /api/users
```

**Data Validation:**
```
- [ ] Email must be unique (error on duplicate)
- [ ] Email automatically converted to lowercase
- [ ] Phone number accepts any string
- [ ] Role defaults to 'customer' if not provided
- [ ] Role only accepts: 'customer' or 'admin'
```

---

### Restaurant Service (Port 3002) - YOUR COMPONENT

**Startup Check:**
- [ ] Service starts with `npm run dev`
- [ ] Logs show: "Restaurant Service running on http://localhost:3002"
- [ ] Logs show: "Connected to MongoDB (restaurant-db)"
- [ ] Swagger available at http://localhost:3002/api-docs

**CRUD Operations:**
```
1. CREATE Restaurant
   [X] POST /api/restaurants with valid data → 201 Created
       Body: {
         "name": "Test Restaurant",
         "address": "123 Main St",
         "cuisine": "Italian",
         "phone": "+1234567890"
       }
   
   [ ] POST /api/restaurants without name → 400 Bad Request
   [ ] POST /api/restaurants without address → 400 Bad Request
   [ ] POST /api/restaurants without cuisine → 400 Bad Request
   [ ] Response includes _id, timestamps
   [ ] isOpen defaults to true

2. READ Restaurants
   [ ] GET /api/restaurants → 200 OK
   [ ] Response is an array
   [ ] GET /api/restaurants/{id} (valid) → 200 OK
   [ ] GET /api/restaurants/{id} (invalid) → 404 Not Found
   [ ] GET /api/restaurants/{id} includes all fields

3. UPDATE Restaurant
   [ ] PUT /api/restaurants/{id} partial update → 200 OK
   [ ] PUT /api/restaurants/{id} update name → 200 OK
   [ ] PUT /api/restaurants/{id} update isOpen → 200 OK
   [ ] PUT /api/restaurants/{id} (invalid id) → 404 Not Found
   [ ] Updated fields reflected in response
   [ ] updatedAt timestamp changes

4. DELETE Restaurant
   [ ] DELETE /api/restaurants/{id} → 200 OK
   [ ] DELETE /api/restaurants/{id} again → 404 Not Found
   [ ] Restaurant no longer in GET /api/restaurants
```

**Data Validation:**
```
- [ ] Name is required and string
- [ ] Address is required and string
- [ ] Cuisine is required and string
- [ ] Phone is optional string
- [ ] isOpen is boolean (default: true)
- [ ] Name is trimmed (spaces removed)
- [ ] Timestamps auto-generated
```

---

### Menu Service (Port 3003)

**Startup Check:**
- [ ] Service starts with `npm run dev`
- [ ] Logs show: "Menu Service running on http://localhost:3003"
- [ ] Logs show: "Connected to MongoDB (menu-db)"

**CRUD Operations:**
```
- [ ] POST /api/menu → 201 Created
- [ ] GET /api/menu → 200 OK (array of items)
- [ ] GET /api/menu/{id} → 200 OK or 404
- [ ] PUT /api/menu/{id} → 200 OK or 404
- [ ] DELETE /api/menu/{id} → 200 OK or 404
```

**Required Fields:**
```
- [ ] restaurantId (required)
- [ ] name (required, trimmed)
- [ ] price (required, >= 0)
- [ ] category (required)
- [ ] description (optional)
- [ ] isAvailable (default: true)
```

---

### Order Service (Port 3004)

**Startup Check:**
- [ ] Service starts with `npm run dev`
- [ ] Logs show: "Order Service running on http://localhost:3004"
- [ ] Logs show: "Connected to MongoDB (order-db)"

**CRUD Operations:**
```
- [ ] POST /api/orders → 201 Created
- [ ] GET /api/orders → 200 OK (array of orders)
- [ ] GET /api/orders/{id} → 200 OK or 404
- [ ] PUT /api/orders/{id} → 200 OK or 404
- [ ] DELETE /api/orders/{id} → 200 OK or 404
```

**Required Fields:**
```
- [ ] userId (required)
- [ ] restaurantId (required)
- [ ] items (required, array)
- [ ] totalAmount (required)
- [ ] deliveryAddress (required)
- [ ] status (enum, default: 'pending')
```

---

## Integration Testing

### Cross-Service Communication

**Scenario 1: Create Restaurant → Order from that restaurant**
```
Step 1: Create User (User Service)
- [ ] POST /api/users → Get userId

Step 2: Create Restaurant (Restaurant Service)
- [ ] POST /api/restaurants → Get restaurantId

Step 3: Create Menu Item (Menu Service)
- [ ] POST /api/menu → Create item for restaurantId

Step 4: Create Order (Order Service)
- [ ] POST /api/orders with userId, restaurantId
- [ ] Verify order is created successfully
```

**Scenario 2: Gateway Routing**
```
- [ ] POST to http://localhost:3000/api/restaurants routes to port 3002
- [ ] GET to http://localhost:3000/api/users routes to port 3001
- [ ] PUT to http://localhost:3000/api/menu routes to port 3003
- [ ] DELETE to http://localhost:3000/api/orders routes to port 3004
```

**Scenario 3: Service Failure Handling**
```
- [ ] Stop Restaurant Service
- [ ] Try GET http://localhost:3000/api/restaurants
- [ ] Expected: 502 Bad Gateway error
- [ ] Start Restaurant Service again
- [ ] Expected: Requests work again
```

---

## Error Handling Verification

### HTTP Status Codes

- [ ] 200 OK - Successful GET/PUT operations
- [ ] 201 Created - Successful POST operations
- [ ] 400 Bad Request - Invalid input/missing required fields
- [ ] 404 Not Found - Resource doesn't exist
- [ ] 500 Internal Server Error - Server error
- [ ] 502 Bad Gateway - Service unavailable (gateway only)

### Error Message Format

- [ ] All errors return JSON with message field
- [ ] Error messages are descriptive
- [ ] Stack traces not exposed in production mode

### Validation Examples

```
Test Case 1: Missing Required Field
- [ ] POST /api/restaurants {} → 400
- [ ] Response: {"message": "Restaurant validation failed"}

Test Case 2: Invalid Object ID
- [ ] GET /api/restaurants/invalid-id → 200 but empty result OR error
- [ ] Should handle gracefully

Test Case 3: Non-existent Resource
- [ ] GET /api/restaurants/507f1f77bcf86cd799439999 → 404
- [ ] Response: {"message": "Restaurant not found"}
```

---

## Performance & Load Testing

### Response Time

- [ ] Single restaurant creation < 500ms
- [ ] Get all restaurants (empty db) < 200ms
- [ ] Get all restaurants (100 items) < 2000ms
- [ ] Single restaurant update < 500ms
- [ ] Single restaurant delete < 500ms

### Concurrent Requests

- [ ] 10 simultaneous GET requests → All succeed
- [ ] 5 simultaneous POST requests → All created
- [ ] Mix of CRUD operations → All processed correctly

### Database Load

- [ ] 1000 restaurants in database → Still responsive
- [ ] Memory usage stays reasonable
- [ ] No memory leaks after 1 hour of operation

---

## Swagger Documentation Verification

### Restaurant Service Swagger

- [ ] http://localhost:3002/api-docs loads
- [ ] All 5 endpoints listed:
  - [ ] GET /api/restaurants
  - [ ] POST /api/restaurants
  - [ ] GET /api/restaurants/{id}
  - [ ] PUT /api/restaurants/{id}
  - [ ] DELETE /api/restaurants/{id}
- [ ] Each endpoint has description
- [ ] Each endpoint shows example responses
- [ ] Can execute requests from Swagger UI
- [ ] Request/response models documented
- [ ] Required fields marked with *

### API Gateway Info

**GET http://localhost:3000/**
- [ ] Returns all 4 service routes
- [ ] All Swagger links working
- [ ] Service status shown

---

## Database Integrity

### MongoDB Validation

**After all CRUD tests:**
```
- [ ] Documents in user-db collection exist
- [ ] Documents in restaurant-db collection exist
- [ ] Documents in menu-db collection exist
- [ ] Documents in order-db collection exist
- [ ] No orphaned documents
- [ ] No duplicate data
- [ ] Timestamps are valid ISO strings
- [ ] _id fields are valid ObjectIds
```

### Data Verification

```
MongoDB Shell Commands to Run:
- [ ] use restaurant-db; db.restaurants.find().count()
- [ ] db.restaurants.findOne() shows all fields
- [ ] db.restaurants.find({isOpen: true})
- [ ] db.restaurants.deleteMany({}) clears collection
```

---

## Code Quality Checks

### Structure

- [ ] Models in `/src/models/`
- [ ] Controllers in `/src/controllers/`
- [ ] Routes in `/src/routes/`
- [ ] Config in `/config/`
- [ ] Main server in `/src/index.js`

### Naming Conventions

- [ ] Files use camelCase or kebab-case
- [ ] Variables use camelCase
- [ ] Classes/Models use PascalCase
- [ ] Functions are descriptive verbs

### Best Practices

- [ ] No console.log in production code (use logger)
- [ ] Use async/await consistently
- [ ] Error handling with try-catch
- [ ] No hardcoded values
- [ ] .env used for configuration
- [ ] Dependencies in package.json

---

## Security Checks

### Input Validation

- [ ] All inputs validated before processing
- [ ] No SQL injection possible (using MongoDB)
- [ ] XSS protection (using JSON)
- [ ] Required fields enforced

### Configuration

- [ ] No sensitive data in code
- [ ] .env not committed to git
- [ ] Passwords not logged
- [ ] Database credentials in .env

### CORS

- [ ] CORS enabled in all services
- [ ] Gateway and services can communicate
- [ ] Browser requests work properly

---

## Documentation Verification

- [ ] README.md exists and is comprehensive
- [ ] API endpoints documented with examples
- [ ] Error responses documented
- [ ] Setup instructions clear
- [ ] Test instructions included
- [ ] Troubleshooting guide provided
- [ ] Environment variables documented

---

## Final Submission Checklist

### Code Submission

- [ ] All services running successfully
- [ ] No console errors or warnings
- [ ] All CRUD operations working
- [ ] All endpoints tested
- [ ] Swagger docs generated correctly
- [ ] Error handling working

### Documentation Submission

- [ ] README for each service
- [ ] API documentation
- [ ] Setup guide
- [ ] Testing guide
- [ ] Architecture diagram
- [ ] Code comments where needed

### Testing Results

- [ ] All unit test scenarios pass
- [ ] Integration tests pass
- [ ] Error handling verified
- [ ] Performance acceptable
- [ ] Database operations verified

### Code Quality

- [ ] Follows consistent patterns
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Good code organization
- [ ] Clear variable names

---

## Sign-Off Checklist

**Member 1 (User Service):**
- [ ] Service complete and tested
- [ ] All endpoints working
- [ ] Documentation provided

**Member 2 (Restaurant Service) - YOUR COMPONENT:**
- [X] Service complete and tested ✓
- [X] All endpoints working ✓
- [X] Documentation provided ✓

**Member 3 (Menu Service):**
- [ ] Service complete and tested
- [ ] All endpoints working
- [ ] Documentation provided

**Member 4 (Order Service):**
- [ ] Service complete and tested
- [ ] All endpoints working
- [ ] Documentation provided

**Team Lead (API Gateway):**
- [ ] Gateway configured correctly
- [ ] All services integrated
- [ ] Routing working properly

---

## Notes for Testing

1. **Test Order Matters:** Test basic CRUD first, then integration
2. **Clean Between Tests:** Delete test data between test runs
3. **Check Logs:** Always check service logs for errors
4. **Use Postman Collections:** Save test requests for reproducibility
5. **Document Findings:** Keep track of all test results
6. **Test Edge Cases:** Test with special characters, long strings, etc.

---

## Common Test Data

### User
```json
{
  "name": "John Doe",
  "phone": "+94771234567",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

### Restaurant
```json
{
  "name": "Spice Garden",
  "address": "45 Main Street, Colombo",
  "cuisine": "Sri Lankan",
  "phone": "+94771234567",
  "isOpen": true
}
```

### Menu Item
```json
{
  "restaurantId": "507f1f77bcf86cd799439011",
  "name": "Biryani",
  "description": "Fragrant rice dish",
  "price": 450,
  "category": "Rice Dishes",
  "isAvailable": true
}
```

### Order
```json
{
  "userId": "507f1f77bcf86cd799439001",
  "restaurantId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "menuItemId": "507f1f77bcf86cd799439021",
      "name": "Biryani",
      "quantity": 2,
      "price": 450
    }
  ],
  "totalAmount": 900,
  "deliveryAddress": "123 Customer Lane, Colombo",
  "status": "pending"
}
```

---

**Status:** ✅ Ready for comprehensive testing and final submission
