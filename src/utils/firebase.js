import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjMKZmVYjf1Ly55VI1-Pr2SHXOU9E8jYY",
  authDomain: "netflixgpt-23700.firebaseapp.com",
  projectId: "netflixgpt-23700",
  storageBucket: "netflixgpt-23700.appspot.com",
  messagingSenderId: "890770479946",
  appId: "1:890770479946:web:9aa0e03296a7d8ded9bfb3"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();