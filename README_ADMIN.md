# Email Verification Admin Panel

This document provides information on how to set up and use the Admin Panel for the Email Verification application.

## Overview

The Admin Panel provides powerful tools for managing and monitoring your email verification platform, including:

- Dashboard with real-time analytics and statistics
- User management for creating, editing, and deleting user accounts
- Email list management across the platform
- Coupon management for promotional discounts
- Credit and subscription management
- Platform configuration and settings

## Installation and Setup

The admin panel is integrated with the main application. To use it:

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables (see below)
4. Run the development server: `npm run dev`
5. Access the admin panel at: `http://localhost:3000/admin`

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://your-backend-api-url
NEXT_PUBLIC_ADMIN_API_URL=http://your-backend-admin-api-url
```

## Admin API Integration with Postman

The admin panel is designed to work with a backend API. You can use Postman to test and develop against the API.

### Setting Up Postman

1. Import the Postman collection from `ADMIN_API_README.md` or create requests manually
2. Create a Postman environment with variables:
   - `baseUrl`: The base URL of your API (e.g., `http://localhost:5000/api`)
   - `adminToken`: Will store the authentication token

### Authentication

Before using any API endpoints, authenticate as an admin:

1. Send a POST request to `{{baseUrl}}/admin/auth/login` with your admin credentials
2. Store the received token in the `adminToken` environment variable
3. All subsequent requests should include the Authorization header: `Bearer {{adminToken}}`

### Key API Endpoints

The admin backend API is organized into several sections:

#### Users Management
- `GET /admin/users` - Get all users
- `GET /admin/users/:id` - Get user by ID
- `POST /admin/users` - Create new user
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

#### Email Lists Management
- `GET /admin/email-lists` - Get all lists
- `GET /admin/email-lists/:id` - Get list by ID
- `POST /admin/email-lists` - Create new list
- `PUT /admin/email-lists/:id` - Update list
- `DELETE /admin/email-lists/:id` - Delete list

#### Coupons Management
- `GET /admin/coupons` - Get all coupons
- `GET /admin/coupons/:id` - Get coupon by ID
- `POST /admin/coupons` - Create new coupon
- `PUT /admin/coupons/:id` - Update coupon
- `DELETE /admin/coupons/:id` - Delete coupon

#### Credits & Subscriptions
- `GET /admin/credits/transactions` - Get all credit transactions
- `POST /admin/credits/add` - Add credits to a user
- `GET /admin/subscriptions` - Get all subscriptions
- `PUT /admin/subscriptions/:id` - Update subscription

#### Analytics
- `GET /admin/analytics/dashboard` - Get dashboard statistics
- `GET /admin/analytics/users` - Get user statistics
- `GET /admin/analytics/verifications` - Get verification statistics
- `GET /admin/analytics/revenue?period=monthly` - Get revenue statistics

For detailed API documentation, refer to `ADMIN_API_README.md`.

## Admin Panel Features

### Dashboard

The admin dashboard provides an overview of your platform with:

- User statistics (existing users, new users)
- Verification metrics
- Revenue charts
- Geographic distribution of users
- Device usage analytics
- Top clients by spend
- Monthly goals tracking

### User Management

The user management page allows you to:

- View all users with search and filter options
- Create new user accounts
- Edit existing user details
- Delete user accounts
- Manage user permissions and subscriptions

### Email List Management

The email list management page lets you:

- View all email lists across the platform
- Create new lists
- Edit existing lists
- Delete lists
- View emails within lists

### Coupons

The coupons page enables you to:

- Create promotional discount coupons
- Set coupon types (percentage or fixed amount)
- Define validity periods
- Set usage limits
- Track coupon usage
- Activate or deactivate coupons

### Credits & Subscriptions

This section allows you to:

- View all subscription plans
- Modify subscription details
- View credit purchase history
- Add credits to user accounts
- Configure subscription settings

## Troubleshooting

If you encounter issues with the admin panel:

1. Ensure your backend API is running and accessible
2. Check that your environment variables are correctly set
3. Verify you have admin privileges in the authentication system
4. Check browser console for any JavaScript errors
5. Check network tab for API request failures

For technical support, contact the development team. 