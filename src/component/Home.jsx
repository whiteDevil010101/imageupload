import React from 'react'
import Imgupload from "./Imgupload"


import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import ImageList from './ImageList';


// Initialize Firebase with your project's config
const firebaseConfig = {
    apiKey: "AIzaSyD7s0CTX0EX9IugI1vFN9xW6K4FoXGr3JA",
    authDomain: "codemaker-f51ef.firebaseapp.com",
    databaseURL: "https://codemaker-f51ef-default-rtdb.firebaseio.com",
    projectId: "codemaker-f51ef",
    storageBucket: "codemaker-f51ef.appspot.com",
    messagingSenderId: "780067339183",
    appId: "1:780067339183:web:ede076b95d2976e4670d5a"
  }
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);


function Home() {
  return (
    <>
    <Imgupload/>
     
   <ImageList/>
    </>
   
  )
}

export default Home