import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBm5CfzbOl8mYldxgN5giPFPImcuSQMEXA",
    authDomain: "online-shopping-mall-ba092.firebaseapp.com",
    projectId: "online-shopping-mall-ba092",
    storageBucket: "online-shopping-mall-ba092.appspot.com",
    messagingSenderId: "212110660805",
    appId: "1:212110660805:web:1c726ddeb383f52fcf4cac"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);