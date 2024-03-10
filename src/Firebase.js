import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBgqXJeIeaOMI3VeQz4dQ0p_m78_jbI2_M",
  authDomain: "login-99e8f.firebaseapp.com",
  projectId: "login-99e8f",
  storageBucket: "login-99e8f.appspot.com",
  messagingSenderId: "954628171031",
  appId: "1:954628171031:web:8c156e8c76afc3a9b88352"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)

const provider = new GoogleAuthProvider()


export const signInWithGoogle=()=>{
signInWithPopup(auth,provider).then((result)=>{

    console.log(result)
    const name=result.user.displayName;
    const email=result.user.email;
    const profilepic=result.user.photoURL
    const id=result.user.uid

    localStorage.setItem("name",name)
    localStorage.setItem("email",email)
    localStorage.setItem("dp",profilepic)
    localStorage.setItem("id",id)
    window.location.reload();
    
}).catch((err)=>{
    console.log(err)
})
}

