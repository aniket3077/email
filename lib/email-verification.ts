/**
 * Temporary Email Verification Algorithm for Development
 * 
 * This is a simplified version of the email verification algorithm for development purposes.
 * It provides predictable results based on email patterns and can be used for testing without
 * connecting to external services.
 */

// Email verification result types
export interface EmailVerificationResult {
  email: string;
  status: 'valid' | 'invalid' | 'risky';
  score: number;
  reason?: string;
}

// Development verification algorithm
export function verifyEmail(email: string): EmailVerificationResult {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      email,
      status: 'invalid',
      score: 0,
      reason: 'Invalid email format'
    };
  }

  // Special development test patterns
  if (email.includes('test.invalid')) {
    return {
      email,
      status: 'invalid',
      score: 0,
      reason: 'Test domain marked as invalid'
    };
  }

  if (email.includes('test.risky') || email.includes('temp') || email.includes('disposable')) {
    return {
      email,
      status: 'risky',
      score: 50,
      reason: 'Possible disposable email address'
    };
  }

  // Special cases for testing specific patterns
  if (email.startsWith('bounce@')) {
    return {
      email,
      status: 'invalid',
      score: 10,
      reason: 'Bounce email pattern detected'
    };
  }

  if (email.startsWith('typo')) {
    return {
      email, 
      status: 'risky',
      score: 40,
      reason: 'Possible typo in domain name'
    };
  }

  // Default behavior: validate based on common patterns
  const lowercaseEmail = email.toLowerCase();
  const domain = lowercaseEmail.split('@')[1];

  // Check for common domains
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  const isCommonDomain = commonDomains.includes(domain);

  // Calculate basic score based on domain and email length
  let score = 85;
  
  // Email patterns logic for development testing
  if (email.includes('role') || email.includes('noreply') || email.includes('no-reply')) {
    score -= 20;
  }
  
  if (email.length > 30) {
    score -= 5;
  }
  
  if (!isCommonDomain) {
    score -= 10;
  }

  if (score < 50) {
    return {
      email,
      status: 'risky',
      score,
      reason: 'Multiple risk factors detected'
    };
  }

  return {
    email,
    status: 'valid',
    score,
    reason: score < 70 ? 'Valid but with minor concerns' : undefined
  };
}

// Batch verification function
export function verifyEmails(emails: string[]): { 
  results: EmailVerificationResult[],
  summary: { valid: number, invalid: number, risky: number, total: number }
} {
  const results = emails.map(email => verifyEmail(email));
  
  // Generate summary
  const summary = {
    valid: results.filter(r => r.status === 'valid').length,
    invalid: results.filter(r => r.status === 'invalid').length,
    risky: results.filter(r => r.status === 'risky').length,
    total: emails.length
  };
  
  return { results, summary };
}

/**
 * FOR TESTING: This function provides deterministic verification results based on patterns
 * Email patterns that yield specific results:
 * 
 * - anything@test.invalid -> invalid
 * - anything@test.risky -> risky
 * - bounce@anything.com -> invalid
 * - typo@anything.com -> risky
 * - anything@temp.com or anything@disposable.com -> risky
 * - role@anything.com or noreply@anything.com -> lower score (may be risky)
 * 
 * Any other properly formatted email will be considered valid with varying scores
 */ 