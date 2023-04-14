import { app } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'

const db = getFirestore(app)

// Referencias
export const categoriesRef = collection(db,"categories")
export const categoryRef = (id) => doc(db,"categories",id)
export const productsRef = collection(db,"products")
export const productRef = (id) => doc(db,"products",id)
export const usersRef = collection(db,'users')
export const userRef = (id) => doc(db,"users",id)
export const wishlistRef = (id) => collection(db,"users",id,'wishlist')
export const wishlistDocRef = (email,id) => doc(db,'users',email,'wishlist',id)
export const orderRef = (email,order) => doc(db,"users",email,"orders",order)
export const ordersRef = (id) => collection(db,'users',id,'orders')
export const reviewsRef = (product) => collection(db,'products',product,'reviews')
