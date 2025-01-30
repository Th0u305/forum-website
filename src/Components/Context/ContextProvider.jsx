import {
  createUserWithEmailAndPassword,
  deleteUser,
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
import { useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

const ContextProvider = ({ children }) => {
  const [money, setMoney] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const myRef = useRef(null);
  const { pathname } = useLocation();
  const [membershipName, setMembershipName] = useState()
  const [searchData, setSearchData] = useState([])

  // register or create account
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // sign in method

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };
console.log();

  // check for current logged user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if (currentUser?.email) {
          setLoading(false);
          setUser(currentUser);
          const { data } = await axios.post( `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_URL__1}`,{ email: currentUser?.email },{ withCredentials: true });
        } else {
          setLoading(false);
          setUser(currentUser);
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_URL__2}`,{ withCredentials: true }
          );
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [pathname, user]);
  

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
    setLoading(true);
    return signOut(firebaseAuth);
  };

  //  google pop up
  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  // reset password

  const resetUserPassword = (email) => {
    return sendPasswordResetEmail(firebaseAuth, email);
  };

  // update user profile
  const updateUserProfile = (updateData) => {
    return updateProfile(firebaseAuth.currentUser, updateData);
  };

  //delete user from firebase
  const deleteUserData = () => {
    return deleteUser(user);
  };

  const contextData = {
    money,
    setMoney,
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
    deleteUserData,
    myRef,
    membershipName,
    setMembershipName,
    searchData,
    setSearchData
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
