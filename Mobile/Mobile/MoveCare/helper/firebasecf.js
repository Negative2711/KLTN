
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEM3U80GRigaK4Ec4vLskdyUUugmFRIPU",
  authDomain: "move-care-3b3b9.firebaseapp.com",
  projectId: "move-care-3b3b9",
  storageBucket: "move-care-3b3b9.appspot.com",
  messagingSenderId: "218122651109",
  appId: "1:218122651109:web:0f24b1ecc24287bf9adb0c",
  measurementId: "G-JSPEWSLD10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);