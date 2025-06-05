
// Simple authentication service for admin login
// In a real app, this would be replaced with proper authentication

export interface Admin {
  username: string;
  password: string;
}

const ADMIN_KEY = 'cyber-admin';

// Default admin credentials
const DEFAULT_ADMIN: Admin = {
  username: 'admin',
  password: 'cybersecure123'
};

// Initialize admin in localStorage if not existing
export const initializeAdmin = (): void => {
  if (!localStorage.getItem(ADMIN_KEY)) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
};

// Login function
export const adminLogin = (username: string, password: string): boolean => {
  try {
    const adminData = localStorage.getItem(ADMIN_KEY);
    if (!adminData) {
      initializeAdmin();
      return username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password;
    }
    
    const admin: Admin = JSON.parse(adminData);
    return username === admin.username && password === admin.password;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

// Update admin credentials
export const updateAdminCredentials = (newUsername: string, newPassword: string): boolean => {
  try {
    const admin: Admin = {
      username: newUsername,
      password: newPassword
    };
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    return true;
  } catch (error) {
    console.error("Error updating credentials:", error);
    return false;
  }
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('admin-logged-in') === 'true';
};

// Set login status
export const setLoginStatus = (status: boolean): void => {
  localStorage.setItem('admin-logged-in', status.toString());
};

// Logout
export const logout = (): void => {
  localStorage.removeItem('admin-logged-in');
};
