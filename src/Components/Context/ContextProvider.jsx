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
import useAxiosPublic from "../Hooks/useAxiosPublic";

const ContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const myRef = useRef(null)
  const axiosPublic = useAxiosPublic()


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
        setLoading(false)
        setUser(currentUser);
        const {data} = await axios.post (`${import.meta.env.VITE_API_URL}/jwt`, {email:currentUser?.email}, {withCredentials : true})  
      }else{
        setLoading(false)
        setUser(currentUser)
        const {data} = await axios.get (`${import.meta.env.VITE_API_URL}/logout`, {withCredentials : true})
      }
      });
    return () => {
      unSubscribe();
    };
  }, []);



// using local storage method

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, currentUser => {
//         setUser(currentUser);
//         if (currentUser) {
//             // get token and store client
//             const userInfo = { email: currentUser.email };
//             axiosPublic.post('/jwt', userInfo)
//                 .then(res => {
//                     if (res.data.token) {
//                         localStorage.setItem('access-token', res.data.token);
//                         setLoading(false);
//                     }
//                 })
//         }
//         else {
//             // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
//             localStorage.removeItem('access-token');
//             setLoading(false);
//         }
        
//     });
//     return () => {
//         return unsubscribe();
//     }
// }, [axiosPublic])

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
