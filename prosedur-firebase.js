// Firebase Functions for Prosedur Management
// Replace Google Sheets with Firestore

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  query 
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDh8YbByLG7AZEaaCgXiWJOK3cuzjxkqog",
  authDomain: "buku-saku-instruktur.firebaseapp.com",
  projectId: "buku-saku-instruktur",
  storageBucket: "buku-saku-instruktur.firebasestorage.app",
  messagingSenderId: "971524107627",
  appId: "1:971524107627:web:89707dc7b42b32e7d1e470"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection name for prosedur files
const PROSEDUR_COLLECTION = 'prosedur_files';

// Get all prosedur files
export async function getProsedurFiles() {
  try {
    const q = query(collection(db, PROSEDUR_COLLECTION), orderBy('namaFile'));
    const querySnapshot = await getDocs(q);
    const files = [];
    
    querySnapshot.forEach((doc) => {
      files.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return files;
  } catch (error) {
    console.error('Error getting prosedur files:', error);
    throw error;
  }
}

// Add new prosedur file
export async function addProsedurFile(fileData) {
  try {
    const docData = {
      namaFile: fileData.namaFile,
      url: fileData.url,
      jenis: fileData.jenis,
      keterangan: fileData.keterangan,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, PROSEDUR_COLLECTION), docData);
    return { id: docRef.id, ...docData };
  } catch (error) {
    console.error('Error adding prosedur file:', error);
    throw error;
  }
}

// Update prosedur file
export async function updateProsedurFile(fileId, fileData) {
  try {
    const docRef = doc(db, PROSEDUR_COLLECTION, fileId);
    const updateData = {
      namaFile: fileData.namaFile,
      url: fileData.url,
      jenis: fileData.jenis,
      keterangan: fileData.keterangan,
      updatedAt: new Date()
    };
    
    await updateDoc(docRef, updateData);
    return { id: fileId, ...updateData };
  } catch (error) {
    console.error('Error updating prosedur file:', error);
    throw error;
  }
}

// Delete prosedur file
export async function deleteProsedurFile(fileId) {
  try {
    await deleteDoc(doc(db, PROSEDUR_COLLECTION, fileId));
    return true;
  } catch (error) {
    console.error('Error deleting prosedur file:', error);
    throw error;
  }
}

// Search prosedur files
export async function searchProsedurFiles(searchTerm, jenisFilter = '') {
  try {
    const files = await getProsedurFiles();
    
    return files.filter(file => {
      const matchSearch = !searchTerm || 
        file.namaFile.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchJenis = !jenisFilter || file.jenis === jenisFilter;
      
      return matchSearch && matchJenis;
    });
  } catch (error) {
    console.error('Error searching prosedur files:', error);
    throw error;
  }
}