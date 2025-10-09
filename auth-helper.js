// Firebase Auth Helper with localStorage fallback
// Use this script for authentication check on all pages

let authCheckComplete = false;
let authTimeout;

// Function to check localStorage as fallback
function checkLocalStorageFallback() {
  const user = JSON.parse(localStorage.getItem('bukuSakuUser') || '{}');
  if (!user.username && !user.email) {
    console.log("No user found in localStorage, redirecting to login");
    window.location.href = "index.html";
    return false;
  }
  console.log("User found in localStorage:", user.username || user.email);
  return true;
}

// Firebase authentication with fallback
async function initAuthCheck() {
  try {
    // Import Firebase modules
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js');
    const { getAuth, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js');

    const firebaseConfig = {
      apiKey: "AIzaSyDh8YbByLG7AZEaaCgXiWJOK3cuzjxkqog",
      authDomain: "buku-saku-instruktur.firebaseapp.com",
      projectId: "buku-saku-instruktur",
      storageBucket: "buku-saku-instruktur.firebasestorage.app",
      messagingSenderId: "971524107627",
      appId: "1:971524107627:web:89707dc7b42b32e7d1e470"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Set timeout fallback
    authTimeout = setTimeout(() => {
      if (!authCheckComplete) {
        console.log("Firebase auth timeout, using localStorage fallback");
        checkLocalStorageFallback();
        authCheckComplete = true;
      }
    }, 3000); // 3 second timeout

    // Firebase auth state listener
    onAuthStateChanged(auth, (user) => {
      if (authCheckComplete) return; // Prevent multiple calls
      
      clearTimeout(authTimeout);
      authCheckComplete = true;

      if (!user) {
        // No Firebase user, check localStorage
        const localUser = JSON.parse(localStorage.getItem('bukuSakuUser') || '{}');
        if (!localUser.username && !localUser.email) {
          console.log("No user authenticated, redirecting to login");
          window.location.href = "index.html";
        } else {
          console.log("User found in localStorage:", localUser.username || localUser.email);
        }
      } else {
        console.log("Firebase user authenticated:", user.email);
        // Store in localStorage for compatibility
        localStorage.setItem('bukuSakuUser', JSON.stringify({
          email: user.email,
          username: user.email
        }));
      }
    });

  } catch (error) {
    console.error("Firebase auth error, using localStorage fallback:", error);
    clearTimeout(authTimeout);
    if (!authCheckComplete) {
      checkLocalStorageFallback();
      authCheckComplete = true;
    }
  }
}

// Initialize authentication check
initAuthCheck();