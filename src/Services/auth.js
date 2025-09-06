// Get the currently logged-in user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Save the logged-in user to localStorage
export const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove the user from localStorage (logout)
export const logoutUser = () => {
  localStorage.removeItem('user');
};
