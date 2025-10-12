// User utility functions for Buku Saku app

/**
 * Extract and format a displayable name from an email address
 * @param {string} email - The email address
 * @returns {string} - Formatted name or original email part
 */
function extractNameFromEmail(email) {
  if (!email) return null;
  
  const namePart = email.split('@')[0];
  
  // Remove numbers first
  let cleanName = namePart.replace(/[0-9]/g, '');
  
  // Replace dots, underscores, hyphens with spaces
  cleanName = cleanName.replace(/[._-]/g, ' ');
  
  // Handle camelCase or PascalCase (e.g., "slametherianto" -> "slamet herianto")
  // Split on capital letters that follow lowercase letters
  cleanName = cleanName.replace(/([a-z])([A-Z])/g, '$1 $2');
  
  // Try to detect common Indonesian name patterns
  cleanName = detectIndonesianNamePattern(cleanName);
  
  // Clean up and format
  cleanName = cleanName
    .trim()
    .split(/\s+/) // Split on any whitespace
    .filter(word => word.length > 0) // Remove empty words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ');
  
  return cleanName || namePart; // Return cleaned name or original if empty
}

/**
 * Detect and split common Indonesian name patterns
 * @param {string} name - The name string to process
 * @returns {string} - Name with better spacing
 */
function detectIndonesianNamePattern(name) {
  // Common Indonesian name patterns and their splits
  const patterns = [
    // Two-word combinations
    { pattern: /^slamet([a-z]+)$/i, replacement: 'slamet $1' },
    { pattern: /^agus([a-z]+)$/i, replacement: 'agus $1' },
    { pattern: /^budi([a-z]+)$/i, replacement: 'budi $1' },
    { pattern: /^andi([a-z]+)$/i, replacement: 'andi $1' },
    { pattern: /^dwi([a-z]+)$/i, replacement: 'dwi $1' },
    { pattern: /^tri([a-z]+)$/i, replacement: 'tri $1' },
    { pattern: /^sri([a-z]+)$/i, replacement: 'sri $1' },
    { pattern: /^nur([a-z]+)$/i, replacement: 'nur $1' },
    { pattern: /^desi([a-z]+)$/i, replacement: 'desi $1' },
    { pattern: /^eka([a-z]+)$/i, replacement: 'eka $1' },
    { pattern: /^made([a-z]+)$/i, replacement: 'made $1' },
    { pattern: /^putu([a-z]+)$/i, replacement: 'putu $1' },
    { pattern: /^wayan([a-z]+)$/i, replacement: 'wayan $1' },
    { pattern: /^ketut([a-z]+)$/i, replacement: 'ketut $1' },
    
    // Three-word combinations (common patterns)
    { pattern: /^([a-z]{3,6})([a-z]{4,8})([a-z]{4,8})$/i, replacement: '$1 $2 $3' },
    
    // Handle patterns where names are clearly concatenated
    // Look for patterns like consonant+vowel boundaries that suggest word breaks
    { pattern: /([aeiou])([bcdfghjklmnpqrstvwxyz]{2,}[aeiou])/gi, replacement: '$1 $2' }
  ];
  
  for (const { pattern, replacement } of patterns) {
    if (pattern.test(name)) {
      name = name.replace(pattern, replacement);
      break; // Use first matching pattern
    }
  }
  
  return name;
}

/**
 * Get the display name for the current user
 * Prioritizes: nama field > extracted name from email > email > fallback
 * @param {Object} userData - User data from localStorage or Firebase
 * @param {string} fallback - Fallback name if nothing else available
 * @returns {string} - Display name for the user
 */
function getUserDisplayName(userData, fallback = 'Pengguna') {
  if (!userData) return fallback;
  
  // Priority order: nama > extracted name from email > displayName > email > fallback
  if (userData.nama) {
    return userData.nama;
  }
  
  if (userData.email) {
    const extractedName = extractNameFromEmail(userData.email);
    if (extractedName && extractedName !== userData.email.split('@')[0]) {
      return extractedName;
    }
  }
  
  return userData.displayName || 
         userData.email || 
         userData.username || 
         fallback;
}

/**
 * Get user data from localStorage with fallback
 * @returns {Object} - User data object
 */
function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('bukuSakuUser') || '{}');
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return {};
  }
}

/**
 * Save user data to localStorage
 * @param {Object} userData - User data to save
 */
function saveCurrentUser(userData) {
  try {
    localStorage.setItem('bukuSakuUser', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data to localStorage:', error);
  }
}

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
function isUserLoggedIn() {
  const userData = getCurrentUser();
  return !!(userData.email || userData.username);
}

/**
 * Redirect to login page if user is not authenticated
 * @param {string} loginPage - Login page URL (default: 'index.html')
 */
function requireAuth(loginPage = 'index.html') {
  if (!isUserLoggedIn()) {
    window.location.href = loginPage;
  }
}

// Make functions available globally
window.userUtils = {
  extractNameFromEmail,
  getUserDisplayName,
  getCurrentUser,
  saveCurrentUser,
  isUserLoggedIn,
  requireAuth
};