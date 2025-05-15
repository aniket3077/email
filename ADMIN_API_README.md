# Admin Panel API Documentation

This document provides information on how to use the Admin Panel API with Postman for the Email Verification application.

## Setup

### Environment Variables

Create a Postman environment with the following variables:

- `baseUrl`: The base URL of your API (e.g., `http://localhost:5000/api`)
- `adminToken`: Used to store the authentication token after login

### Authentication

Before using any endpoints, you need to authenticate as an admin:

1. Make a POST request to `{{baseUrl}}/admin/auth/login`
2. In the request body, provide:
   ```json
   {
     "email": "admin@example.com",
     "password": "your-admin-password"
   }
   ```
3. From the response, copy the token and set it to the `adminToken` environment variable
4. For subsequent requests, ensure you include the Authorization header: `Bearer {{adminToken}}`

## API Endpoints

### Users Management

#### Get All Users
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/users`
- **Description**: Retrieves a list of all users

#### Get User by ID
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/users/:userId`
- **Description**: Retrieves a specific user by ID

#### Create User
- **Method**: POST
- **Endpoint**: `{{baseUrl}}/admin/users`
- **Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password",
    "username": "username",
    "subscription": "Basic"
  }
  ```

#### Update User
- **Method**: PUT
- **Endpoint**: `{{baseUrl}}/admin/users/:userId`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com",
    "subscription": "Premium"
  }
  ```

#### Delete User
- **Method**: DELETE
- **Endpoint**: `{{baseUrl}}/admin/users/:userId`

### Email Lists Management

#### Get All Lists
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/email-lists`

#### Get List by ID
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/email-lists/:listId`

#### Create List
- **Method**: POST
- **Endpoint**: `{{baseUrl}}/admin/email-lists`
- **Body**:
  ```json
  {
    "name": "List Name",
    "description": "List Description",
    "userId": "user-id-owner"
  }
  ```

#### Update List
- **Method**: PUT
- **Endpoint**: `{{baseUrl}}/admin/email-lists/:listId`
- **Body**:
  ```json
  {
    "name": "Updated List Name",
    "description": "Updated Description"
  }
  ```

#### Delete List
- **Method**: DELETE
- **Endpoint**: `{{baseUrl}}/admin/email-lists/:listId`

### Coupons Management

#### Get All Coupons
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/coupons`

#### Get Coupon by ID
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/coupons/:couponId`

#### Create Coupon
- **Method**: POST
- **Endpoint**: `{{baseUrl}}/admin/coupons`
- **Body**:
  ```json
  {
    "code": "SUMMER10",
    "name": "Summer Discount",
    "discount": "10%",
    "status": "Active",
    "usageLimit": 100,
    "validFrom": "2023-06-01",
    "validTo": "2023-06-30"
  }
  ```

#### Update Coupon
- **Method**: PUT
- **Endpoint**: `{{baseUrl}}/admin/coupons/:couponId`
- **Body**:
  ```json
  {
    "name": "Updated Coupon Name",
    "status": "Expired"
  }
  ```

#### Delete Coupon
- **Method**: DELETE
- **Endpoint**: `{{baseUrl}}/admin/coupons/:couponId`

### Credits Management

#### Get All Transactions
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/credits/transactions`

#### Add Credits to User
- **Method**: POST
- **Endpoint**: `{{baseUrl}}/admin/credits/add`
- **Body**:
  ```json
  {
    "userId": "user-id",
    "amount": 100
  }
  ```

### Subscriptions Management

#### Get All Subscriptions
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/subscriptions`

#### Update Subscription
- **Method**: PUT
- **Endpoint**: `{{baseUrl}}/admin/subscriptions/:subscriptionId`
- **Body**:
  ```json
  {
    "status": "active",
    "expiryDate": "2024-12-31"
  }
  ```

### Analytics

#### Get Dashboard Stats
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/analytics/dashboard`

#### Get User Stats
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/analytics/users`

#### Get Verification Stats
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/analytics/verifications`

#### Get Revenue Stats
- **Method**: GET
- **Endpoint**: `{{baseUrl}}/admin/analytics/revenue?period=monthly`

## Error Handling

All API responses follow a standard format:

- Success response:
  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

- Error response:
  ```json
  {
    "success": false,
    "error": "Error message"
  }
  ```

## Testing with Postman

1. Import the Postman collection file (if provided) or create requests manually
2. Set up the environment variables
3. Authenticate to get your admin token
4. Start making API requests
5. Use the Pre-request Script tab to set any dynamic variables or perform calculations
6. Use the Tests tab to validate responses and set environment variables

## Notes

- All API routes are prefixed with `/admin` to distinguish them from regular user routes
- Make sure to include proper authentication headers for all requests
- If you encounter CORS issues during local development, ensure your backend is configured to accept requests from your frontend origin 