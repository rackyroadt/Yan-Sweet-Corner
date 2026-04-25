import { useState } from 'react';
import { verifyCredentials, validateLoginInput } from '../utils/auth';

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Input validation
    const validationError = validateLoginInput(username, password);
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    // Small artificial delay to discourage brute force attempts (~0.5s)
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (verifyCredentials(username, password)) {
      onSuccess();
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">Yan Sweet Corner — staff only</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-label">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              maxLength={50}
              disabled={isSubmitting}
              className="login-input"
              required
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              maxLength={100}
              disabled={isSubmitting}
              className="login-input"
              required
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button
            type="submit"
            className="btn btn--reserve login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Checking…' : 'Log In'}
          </button>
        </form>

        <p className="login-footer">
          <a href="/">← Back to public site</a>
        </p>
      </div>
    </div>
  );
}
