import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZQN9tsQFh4jwVQLtL25cKh50DXc6db9Q",
  authDomain: "sir-basit-hacka.firebaseapp.com",
  projectId: "sir-basit-hacka",
  storageBucket: "sir-basit-hacka.appspot.com",
  messagingSenderId: "871923339400",
  appId: "1:871923339400:web:d7d7dc5839e20e2aee8f3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cnic = document.getElementById("CNIC");

document
  .getElementById("registerUser")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const form = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      cnic: cnic.value,
    };

    try {
      const admin = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const userId = admin.user.uid;

      await setDoc(doc(db, "students", userId), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        CNIC: form.cnic,
        userType: "student",
      });

      console.log("successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  });