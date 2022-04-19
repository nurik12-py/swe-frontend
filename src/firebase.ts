// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYhirR8_PVlJXMkr8XMnImztekAeNfG7Y",
  authDomain: "swe-manager.firebaseapp.com",
  projectId: "swe-manager",
  storageBucket: "swe-manager.appspot.com",
  messagingSenderId: "881278609544",
  appId: "1:881278609544:web:5bcc00ae3733cf76c3173d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
