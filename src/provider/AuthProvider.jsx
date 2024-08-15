import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { GoogleAuthProvider,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";




export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {


    const [user, setUser] = useState({})
  
    const googleProvider = new GoogleAuthProvider()


    const loginWithGoogle = ()=> {
     
        return signInWithPopup(auth, googleProvider)
     }
     


    //  email and password base authantication

    const registar = (email, password)=>{

        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo)=>{
    
    
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL:photo
        })
    }
    const logOut = ()=>{

  
     return signOut(auth)
    }

    
useEffect(()=>{

const unSubscribe  = onAuthStateChanged(auth, (currentUser)=>{

  

        setUser(currentUser)
    
    



})

return ()=> unSubscribe()

},[])


     const authInfo = { loginWithGoogle,  registar, login, logOut, updateUser, user}


    return (
        <AuthContext.Provider value={authInfo}>

            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};
export default AuthProvider;