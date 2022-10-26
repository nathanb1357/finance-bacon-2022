//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAPCMbATa2_Wdla2DeFC--fRrqov8tdeQg",
    authDomain: "comp1800-66495.firebaseapp.com",
    projectId: "comp1800-66495",
    storageBucket: "comp1800-66495.appspot.com",
    messagingSenderId: "296263501210",
    appId: "1:296263501210:web:4dbdeb790866268a442623"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();