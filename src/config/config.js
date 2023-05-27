import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'

import 'firebase/compat/firestore'

import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBzs0cGHuNbe5kTio5JjjLm7wt6h1mR0Qk",
    authDomain: "upload-41bf5.firebaseapp.com",
    projectId: "upload-41bf5",
    storageBucket: "upload-41bf5.appspot.com",
    messagingSenderId: "744876048861",
    appId: "1:744876048861:web:92d57ed1a95d3c4aba3634"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }
