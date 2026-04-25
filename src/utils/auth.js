
function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Verifies the entered username and password against environment-stored credentials.
 * Returns true if credentials match, false otherwise.
 */
export function verifyCredentials(username, password) {
  const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error(
      'Admin credentials not configured. Make sure .env contains VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD, and that you restarted the dev server after creating .env.'
    );
    return false;
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const usernameOk = constantTimeEqual(username.trim(), expectedUsername);
  const passwordOk = constantTimeEqual(password, expectedPassword);

  return usernameOk && passwordOk;
}


export function validateLoginInput(username, password) {
  if (!username || typeof username !== 'string' || !username.trim()) {
    return 'Username is required';
  }
  if (!password || typeof password !== 'string') {
    return 'Password is required';
  }
  if (username.length > 50) {
    return 'Username is too long';
  }
  if (password.length > 100) {
    return 'Password is too long';
  }
  return null;
}

