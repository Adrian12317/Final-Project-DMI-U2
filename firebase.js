// Import firebase
import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUZxfLp4VWQOamMDYN-yGjAvQ357mIBHs",
  authDomain: "login-adrian-44a42.firebaseapp.com",
  projectId: "login-adrian-44a42",
  storageBucket: "login-adrian-44a42.appspot.com",
  messagingSenderId: "46073804174",
  appId: "1:46073804174:web:5ac9c1fd0d0febfc1960df",
  measurementId: "G-9C9FY5E79P"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  console.info({ firebase });
  app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}


const auth = firebase.auth();
const database = app.database();
const storage = firebase.storage();

export { auth,database,storage };
