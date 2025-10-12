// Fallback system for prosedur management
// Use localStorage when Firebase is not available

const STORAGE_KEY = 'prosedur_files_fallback';

// Get data from localStorage
function getLocalProsedurFiles() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

// Save data to localStorage
function saveLocalProsedurFiles(files) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

// Add file to localStorage
function addLocalProsedurFile(fileData) {
  const files = getLocalProsedurFiles();
  const newFile = {
    id: Date.now().toString(), // Simple ID generation
    ...fileData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  files.push(newFile);
  saveLocalProsedurFiles(files);
  return newFile;
}

// Update file in localStorage
function updateLocalProsedurFile(fileId, fileData) {
  const files = getLocalProsedurFiles();
  const index = files.findIndex(f => f.id === fileId);
  if (index !== -1) {
    files[index] = {
      ...files[index],
      ...fileData,
      updatedAt: new Date().toISOString()
    };
    saveLocalProsedurFiles(files);
    return files[index];
  }
  return null;
}

// Delete file from localStorage
function deleteLocalProsedurFile(fileId) {
  const files = getLocalProsedurFiles();
  const filteredFiles = files.filter(f => f.id !== fileId);
  saveLocalProsedurFiles(filteredFiles);
  return true;
}

// Search files in localStorage
function searchLocalProsedurFiles(searchTerm, jenisFilter = '') {
  const files = getLocalProsedurFiles();
  return files.filter(file => {
    const matchSearch = !searchTerm || 
      file.namaFile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchJenis = !jenisFilter || file.jenis === jenisFilter;
    
    return matchSearch && matchJenis;
  });
}

// Initialize with sample data if empty
function initializeSampleData() {
  const files = getLocalProsedurFiles();
  if (files.length === 0) {
    const sampleData = [
      {
        namaFile: "SOP Pelatihan Dasar",
        url: "#",
        jenis: "SOP",
        keterangan: "Standard Operating Procedure untuk pelatihan dasar karyawan"
      },
      {
        namaFile: "STD Keselamatan Kerja",
        url: "#",
        jenis: "STD", 
        keterangan: "Standard keselamatan kerja di area produksi"
      },
      {
        namaFile: "INK Quality Control",
        url: "#",
        jenis: "INK",
        keterangan: "Instruksi kerja untuk quality control produk"
      }
    ];
    
    sampleData.forEach(item => addLocalProsedurFile(item));
    console.log("Sample prosedur data initialized");
  }
}

// Export functions for global use
window.ProsedurFallback = {
  get: getLocalProsedurFiles,
  add: addLocalProsedurFile,
  update: updateLocalProsedurFile,
  delete: deleteLocalProsedurFile,
  search: searchLocalProsedurFiles,
  init: initializeSampleData
};