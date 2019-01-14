import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDrbEckhfPAly7iRE_lYxcJc7WBG9DfREA",
    authDomain: "fir-user-post-fc347.firebaseapp.com",
    databaseURL: "https://fir-user-post-fc347.firebaseio.com",
    projectId: "fir-user-post-fc347",
    storageBucket: "fir-user-post-fc347.appspot.com",
    messagingSenderId: "687134739391"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database()
  const firebaseUsers = firebaseDB.ref('user')
  const firebasePosts = firebaseDB.ref('posts')

  export { 
      firebase,
      firebaseUsers,
      firebasePosts
    }