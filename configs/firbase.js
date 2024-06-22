// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {getAuth , GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcadXtuxxTbanD72i5QqvUzYXKHXEWFRk',
  authDomain: 'react-auth-fbb75.firebaseapp.com',
  projectId: 'react-auth-fbb75',
  storageBucket: 'react-auth-fbb75.appspot.com',
  messagingSenderId: '627292033327',
  appId: '1:627292033327:web:c71be166f61af65f7f11da',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const provide = new GoogleAuthProvider()
