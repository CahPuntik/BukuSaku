// Firebase Configuration and Database Operations
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';

// Database Collections
const COLLECTIONS = {
  USERS: 'users',
  DAILY_ACTIVITIES: 'daily_activities',
  TRAINING_SCHEDULE: 'training_schedule',
  ROSTER_CUTI: 'roster_cuti',
  PREPOST_TEST: 'prepost_test',
  PROGRESS_UPDATE: 'progress_update',
  ADMINISTRASI: 'administrasi'
};

// User Management
export async function saveUser(userData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.USERS), {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export async function getUser(username) {
  try {
    const q = query(
      collection(window.firebase.db, COLLECTIONS.USERS), 
      where("username", "==", username)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Daily Activity Management
export async function saveDailyActivity(activityData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.DAILY_ACTIVITIES), {
      ...activityData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving daily activity:', error);
    throw error;
  }
}

export async function getDailyActivities(userId = null) {
  try {
    let q;
    if (userId) {
      q = query(
        collection(window.firebase.db, COLLECTIONS.DAILY_ACTIVITIES),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(window.firebase.db, COLLECTIONS.DAILY_ACTIVITIES),
        orderBy("createdAt", "desc")
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting daily activities:', error);
    throw error;
  }
}

// Training Schedule Management
export async function saveTrainingSchedule(scheduleData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.TRAINING_SCHEDULE), {
      ...scheduleData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving training schedule:', error);
    throw error;
  }
}

export async function getTrainingSchedules() {
  try {
    const q = query(
      collection(window.firebase.db, COLLECTIONS.TRAINING_SCHEDULE),
      orderBy("startDate", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting training schedules:', error);
    throw error;
  }
}

// Roster Cuti Management
export async function saveRosterCuti(rosterData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.ROSTER_CUTI), {
      ...rosterData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving roster cuti:', error);
    throw error;
  }
}

// Pre/Post Test Management
export async function savePrePostTest(testData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.PREPOST_TEST), {
      ...testData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving pre/post test:', error);
    throw error;
  }
}

// Progress Update Management
export async function saveProgressUpdate(progressData) {
  try {
    const docRef = await addDoc(collection(window.firebase.db, COLLECTIONS.PROGRESS_UPDATE), {
      ...progressData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving progress update:', error);
    throw error;
  }
}

// Generic CRUD operations
export async function updateDocument(collection, docId, data) {
  try {
    const docRef = doc(window.firebase.db, collection, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function deleteDocument(collection, docId) {
  try {
    await deleteDoc(doc(window.firebase.db, collection, docId));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

// Utility functions
export function formatFirebaseDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}