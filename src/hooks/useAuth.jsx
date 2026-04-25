import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'yan-sweet-admin-session';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  });

  // Sync state across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsLoggedIn(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsLoggedIn(false);
  }, []);

  return { isLoggedIn, login, logout };
}
