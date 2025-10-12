// Firebase Functions for Prosedur Management
// Replace Google Sheets with Firestore + Storage for file uploads

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
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';

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
const storage = getStorage(app);

// Collection name for prosedur files
const PROSEDUR_COLLECTION = 'prosedur_files';
const STORAGE_FOLDER = 'prosedur_files/';

// Upload file to Firebase Storage
export async function uploadProsedurFile(file, fileName) {
  try {
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${fileName}_${timestamp}.${fileExtension}`;
    
    const storageRef = ref(storage, `${STORAGE_FOLDER}${uniqueFileName}`);
    
    // Upload file
    console.log('Uploading file to Firebase Storage...');
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File uploaded successfully. Download URL:', downloadURL);
    
    return {
      url: downloadURL,
      filename: uniqueFileName,
      originalName: file.name,
      size: file.size,
      type: file.type
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

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

// Add new prosedur file with upload
export async function addProsedurFile(fileData, uploadedFile = null) {
  try {
    let fileUrl = fileData.url || '';
    let fileInfo = {};
    
    // If file is uploaded, upload to Firebase Storage first
    if (uploadedFile) {
      const uploadResult = await uploadProsedurFile(uploadedFile, fileData.namaFile);
      fileUrl = uploadResult.url;
      fileInfo = {
        filename: uploadResult.filename,
        originalName: uploadResult.originalName,
        size: uploadResult.size,
        type: uploadResult.type
      };
    }
    
    const docData = {
      namaFile: fileData.namaFile,
      url: fileUrl,
      jenis: fileData.jenis,
      keterangan: fileData.keterangan,
      ...fileInfo,
      isUploaded: !!uploadedFile,
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
      ...fileData,
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
    // Get file data first to check if we need to delete from Storage
    const files = await getProsedurFiles();
    const fileData = files.find(f => f.id === fileId);
    
    // Delete document from Firestore
    await deleteDoc(doc(db, PROSEDUR_COLLECTION, fileId));
    
    // Delete file from Storage if it was uploaded
    if (fileData && fileData.isUploaded && fileData.filename) {
      try {
        const fileRef = ref(storage, `${STORAGE_FOLDER}${fileData.filename}`);
        await deleteObject(fileRef);
        console.log('File deleted from Storage:', fileData.filename);
      } catch (storageError) {
        console.warn('Could not delete file from Storage:', storageError);
        // Don't throw error here, document deletion is more important
      }
    }
    
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