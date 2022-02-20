import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDiJ99F9PRTRvfDFcFOhy1GmeesR4su0ok",
	authDomain: "todo-app-b408c.firebaseapp.com",
	projectId: "todo-app-b408c",
	storageBucket: "todo-app-b408c.appspot.com",
	messagingSenderId: "806594925656",
	appId: "1:806594925656:web:a73eda57651a584bfe262d",
	measurementId: "G-BKZ4QRDCBT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();

export { auth, storage };

export default db;
