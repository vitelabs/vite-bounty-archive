import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import firebaseCredentials from './firebaseCredentials'

// Initialize Firebase
const app = initializeApp(firebaseCredentials.config)

export const database = getDatabase()
export const firestoreDB = getFirestore()

export const bookkeepingStore = collection(firestoreDB, 'bookkeeping')
export const bookkeepingDocID = 'bookkeeping-doc'
export const rewardHistoryStore = collection(firestoreDB, 'rewards')
export const rewardHistoryDocID = 'rewards-history'
export const rewardsBackupStore = collection(firestoreDB, 'rewards-backup')
export const rewardsBackupDocID = 'rewards-backup-history'
export const sbpDocID = 'sbp-history-doc'
export const viteDocID = 'vite-history-doc'
export const vxDocID = 'vx-history-doc'

export async function addNewDoc(storeCollection, data) {
  return addDoc(storeCollection, data)
}

export async function getAllData(storeCollection) {
  return getDocs(storeCollection)
}

export async function getDataById(storeCollection, docID) {
  return getDoc(doc(storeCollection, docID))
}

export async function updateDocData(storeCollection, docID, newData) {
  return updateDoc(doc(storeCollection, docID), newData)
}

export default app
