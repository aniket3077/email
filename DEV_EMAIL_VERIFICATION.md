# Development Email Verification Algorithm

This document explains how to use the temporary email verification algorithm implemented for development purposes.

## Overview

The development email verification algorithm provides a predictable way to test the email verification functionality without connecting to external services. It evaluates email addresses based on predefined patterns and rules to simulate real-world verification.

## How to Enable Development Mode

The application can be switched between development mode and production mode using the configuration in `lib/api-config.ts`:

```typescript
// Set to true to use the development API with local verification
export const USE_DEV_API = true;
```

When `USE_DEV_API` is set to `true`, the application will use the local email verification algorithm instead of making API calls to the real verification service.

## Development Credentials

For testing purposes, you can use the following development credentials:

### Regular User
- Email: `test@example.com`
- Password: `test1234`

### Admin User
- Email: `admin@example.com`
- Password: `admin1234`

These credentials are defined in `lib/api-config.ts` and will work when the application is in development mode.

## Email Verification Patterns

The development email verification algorithm uses specific patterns to determine the status of an email:

| Pattern | Status | Score | Description |
|---------|--------|-------|-------------|
| Invalid format | Invalid | 0 | Doesn't match basic email format |
| `*@test.invalid` | Invalid | 0 | Test domain for invalid emails |
| `*@test.risky` | Risky | 50 | Test domain for risky emails |
| `*@temp.*` or `*@disposable.*` | Risky | 50 | Disposable email patterns |
| `bounce@*` | Invalid | 10 | Simulates bounce emails |
| `typo@*` | Risky | 40 | Simulates typos in email addresses |
| Contains `role` or `noreply` | Lower score | - | Role-based email patterns |

Any other properly formatted email will be considered valid, with varying scores based on additional factors like domain popularity and email length.

## Testing Specific Cases

You can test specific verification cases using these patterns:

```
// Invalid email examples (will return status: 'invalid')
bad.email
anything@test.invalid
bounce@example.com

// Risky email examples (will return status: 'risky')
user@test.risky
someone@temp.com
user@disposable.email
typo@gmial.com
role-account@company.com

// Valid email examples (will return status: 'valid')
user@gmail.com
contact@company.com
john.doe@outlook.com
```

## Implementation Details

The development email verification code is implemented in:

- `lib/email-verification.ts` - Core verification algorithm
- `lib/dev-api-service.ts` - Mock API service using the algorithm
- `lib/api-config.ts` - Configuration to toggle between dev/prod

### Example Usage

```typescript
import { verifyEmail, verifyEmails } from './lib/email-verification';

// Verify a single email
const result = verifyEmail('user@example.com');
console.log(result);
// Output: { email: 'user@example.com', status: 'valid', score: 75 }

// Verify multiple emails
const batchResult = verifyEmails(['user@gmail.com', 'bad.email', 'role@company.com']);
console.log(batchResult.summary);
// Output: { valid: 2, invalid: 1, risky: 0, total: 3 }
```

## Development API Service

The development API service (`lib/dev-api-service.ts`) provides mock implementations of all the real API endpoints, using the local verification algorithm for email verification. It includes:

- Authentication endpoints (login, register, forgot password)
- User profile management
- Email verification endpoints
- Credits and subscription management

The service adds artificial delays to simulate network requests and stores verification results in memory for the duration of the session.

## Extending the Algorithm

To extend the algorithm with additional patterns or rules, modify the `verifyEmail` function in `lib/email-verification.ts`. The function accepts an email string and returns an `EmailVerificationResult` object with the following properties:

- `email`: The email address that was verified
- `status`: One of 'valid', 'invalid', or 'risky'
- `score`: A number from 0 to 100 indicating the confidence level
- `reason`: Optional string explaining the result 