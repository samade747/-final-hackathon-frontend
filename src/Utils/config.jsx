import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDownloadURL,
  ref,
  getStorage,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpJI3hOrggbToTbphT_nVUW7sepiiU1EQ",
  authDomain: "socail-media-images.firebaseapp.com",
  projectId: "socail-media-images",
  storageBucket: "socail-media-images.appspot.com",
  messagingSenderId: "212646702500",
  appId: "1:212646702500:web:f3c09881657124d3972531",
  measurementId: "G-EQ30ZRENXE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, getDownloadURL, ref, storage, uploadBytesResumable };
