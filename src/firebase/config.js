// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPl59bpYWgADUXUv7cl30LBM0GPZ9Dj-g",
  authDomain: "traveloka-md04.firebaseapp.com",
  projectId: "traveloka-md04",
  storageBucket: "traveloka-md04.appspot.com",
  messagingSenderId: "97056861566",
  appId: "1:97056861566:web:77d993c9119b7b32ab572f",
  measurementId: "G-3PYR8WTH9K",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAPl59bpYWgADUXUv7cl30LBM0GPZ9Dj-g",
//   authDomain: "traveloka-md04.firebaseapp.com",
//   projectId: "traveloka-md04",
//   storageBucket: "traveloka-md04.appspot.com",
//   messagingSenderId: "97056861566",
//   appId: "1:97056861566:web:77d993c9119b7b32ab572f",
//   measurementId: "G-3PYR8WTH9K"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
