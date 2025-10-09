// Debug Firebase Authentication Status
// Paste this in browser console to check Firebase status

console.log('🔥 Firebase Debug Info:');
console.log('Project ID:', window.firebase?.app?.options?.projectId);
console.log('Auth Domain:', window.firebase?.app?.options?.authDomain);
console.log('API Key:', window.firebase?.app?.options?.apiKey?.substring(0, 10) + '...');

// Test Firebase connection
window.firebase?.auth?.onAuthStateChanged((user) => {
  console.log('🔐 Auth State:', user ? 'Logged In' : 'Not Logged In');
  if (user) {
    console.log('👤 User:', user.email);
  }
});

console.log('✨ Firebase status check complete. Try registering a new account!');