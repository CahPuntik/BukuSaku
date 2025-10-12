// Debug test for prosedur fallback system
console.log("🔍 Testing prosedur fallback system...");

// Test localStorage
try {
  // Clear existing data for clean test
  localStorage.removeItem('prosedur_files_fallback');
  
  // Test save function
  const testData = {
    namaFile: "Test Document",
    jenis: "SOP", 
    keterangan: "Test description",
    url: "#"
  };
  
  console.log("📝 Adding test data:", testData);
  const result = window.ProsedurFallback.add(testData);
  console.log("✅ Result:", result);
  
  // Test get function
  const allData = window.ProsedurFallback.get();
  console.log("📊 All data:", allData);
  
  if (allData.length > 0) {
    console.log("✅ localStorage test PASSED");
  } else {
    console.log("❌ localStorage test FAILED");
  }
  
} catch (error) {
  console.error("❌ Error testing fallback:", error);
}

// Test form submission
console.log("🔍 Testing form submission...");
const form = document.getElementById('addForm');
if (form) {
  console.log("✅ Form found");
  
  // Check if form has submit event listener
  const listeners = getEventListeners(form);
  console.log("👂 Form event listeners:", listeners);
} else {
  console.log("❌ Form NOT found");
}