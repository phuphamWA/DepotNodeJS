import app from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCZZvTvNeWnROBw0qwRDjSTDu7eT3HPn5w",
    authDomain: "homedepotweb.firebaseapp.com",
    databaseURL: "https://homedepotweb.firebaseio.com",
    projectId: "homedepotweb",
    storageBucket: "homedepotweb.appspot.com",
    messagingSenderId: "356352630003",
    appId: "1:356352630003:web:fa3427779ae8ab6eb16b86",
    measurementId: "G-NZLWZL94D1"
};
class FireBaseSetup {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }
    async login(email, password) {
        const userLogin = await this.auth.signInWithEmailAndPassword(email, password).catch(err => { console.log(err.code);return err.message })
        
        return userLogin;
    }
    async logout() {
        return await this.auth.signOut();
    }

    async register(email, password) {
        const userRegister = await this.auth.createUserWithEmailAndPassword(email, password).catch(err => { return err.message })
        return userRegister;
    }

   

    displayEmail() {
        if (!this.auth.currentUser) {
            return null; 
        }
        return this.auth.currentUser.email;
    }   
    
    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
};

export default new FireBaseSetup();