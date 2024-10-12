// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCEDP8Asm20kwdywHfAC5tJXPGSRuVXtDk',
  authDomain: 'personal-health-dashboar-d5ae6.firebaseapp.com',
  projectId: 'personal-health-dashboar-d5ae6',
  storageBucket: 'personal-health-dashboar-d5ae6.appspot.com',
  messagingSenderId: '371198899393',
  appId: '1:371198899393:web:3714b5672a2b6936bb5040',
  measurementId: 'G-B2DQ01V34C',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
