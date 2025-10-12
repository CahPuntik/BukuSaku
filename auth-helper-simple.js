// Simple Auth Helper - No Redirect Version
// This version allows pages to load without authentication check

console.log("Auth Helper Loaded - No Redirect Mode");

// Create a dummy user to prevent any auth issues
const dummyUser = {
  username: "user",
  email: "user@example.com",
  name: "Current User"
};

// Set dummy user in localStorage to satisfy any auth checks
localStorage.setItem('bukuSakuUser', JSON.stringify(dummyUser));

console.log("Page loaded successfully - authentication bypassed for debugging");