// Script to create sample prosedur data in Firebase
// Run this in browser console after Firebase rules are deployed

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

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

const sampleData = [
  {
    namaFile: "SOP Pelatihan Dasar",
    url: "https://drive.google.com/file/d/sample1",
    jenis: "SOP",
    keterangan: "Standard Operating Procedure untuk pelatihan dasar karyawan",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    namaFile: "STD Keselamatan Kerja",
    url: "https://drive.google.com/file/d/sample2", 
    jenis: "STD",
    keterangan: "Standard keselamatan kerja di area produksi",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    namaFile: "INK Quality Control",
    url: "https://drive.google.com/file/d/sample3",
    jenis: "INK",
    keterangan: "Instruksi kerja untuk quality control produk",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function createSampleData() {
  try {
    console.log("Creating sample prosedur data...");
    
    for (const item of sampleData) {
      const docRef = await addDoc(collection(db, 'prosedur_files'), item);
      console.log("Document added with ID: ", docRef.id);
    }
    
    console.log("Sample data created successfully!");
  } catch (error) {
    console.error("Error creating sample data:", error);
  }
}

// Export for manual execution
window.createSampleProsedurData = createSampleData;