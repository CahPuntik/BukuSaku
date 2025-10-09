// Simple login script for testing
// Run this in browser console to create a test user

console.log("Creating test user for localStorage fallback...");

const testUser = {
  username: "testuser",
  email: "test@example.com",
  password: "test123",
  name: "Test User"
};

localStorage.setItem('bukuSakuUser', JSON.stringify(testUser));
console.log("Test user created:", testUser);
console.log("You can now navigate to other pages without redirect issues");

// Show current user
const currentUser = JSON.parse(localStorage.getItem('bukuSakuUser') || '{}');
console.log("Current user in localStorage:", currentUser);