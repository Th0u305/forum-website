import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { firebaseAuth } from "../Pages/Private/firebase/firebase.config";
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
import { useRef } from 'react';
import axios from "axios";

const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const myRef = useRef(null)


  // register or create account
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // sign in method

  const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(firebaseAuth, email, password)
}

  // check for current logged user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {            
      if (currentUser?.email) {
        setUser(currentUser);
        const {data} = await axios.post (`${import.meta.env.VITE_API_URL}/jwt`, {email:currentUser?.email}, {withCredentials : true})  
      }else{
        setUser(currentUser)
        const {data} = await axios.get (`${import.meta.env.VITE_API_URL}/logout`, {withCredentials : true})
      }
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // sign out user
  const signOutUser = () => {
    setLoading(true)
    return signOut(firebaseAuth);
  };

  //  google pop up
  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  
  // reset password 

  const resetUserPassword =(email)=>{
    return sendPasswordResetEmail(firebaseAuth, email)
  }

 // update user profile
  const updateUserProfile = (updateData) =>{
    return updateProfile(firebaseAuth.currentUser, updateData)
  }


  const contextData = {
    signInWithGoogle,
    signOutUser,
    user,
    setUser,
    loading,
    setLoading,
    signInUser,
    createUser,
    updateUserProfile,
    resetUserPassword,
    myRef
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
