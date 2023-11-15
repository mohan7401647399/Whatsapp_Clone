import firebase from 'firebase/compat/app' 
import 'firebase/compat/firestore';
// import { GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcb36VdqXdGiTsHgeHZWHfMDceDpqwahM",
    authDomain: "whatsapp-clone-react-f0298.firebaseapp.com",
    projectId: "whatsapp-clone-react-f0298",
    storageBucket: "whatsapp-clone-react-f0298.appspot.com",
    messagingSenderId: "912804285443",
    appId: "1:912804285443:web:e6a8e10d220a0b08ae9236"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

const db = app.firestore(app);

export { db,auth,provider };