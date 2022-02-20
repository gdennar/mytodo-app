import {React, createContext, useContext, useState, useEffect} from 'react';
import { auth } from '../firebase';






const AuthContext = createContext();




export function useAuth() {
    return useContext(AuthContext)
};

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [pending, setPending] = useState(true);


    function signUp(name, email, password) {
        return auth.createUserWithEmailAndPassword(name, email, password)
      }


    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
      }
    
    function logout(){
        return auth.signOut()
    }

    function passwordReset(email){
        return auth.sendPasswordResetEmail(email)
        
    }

  
	
    useEffect(()=>{
    const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
        })
            return () => { unsubscribe()}
    },[])
    
	if (pending){
        return <div>Loading...</div>
    }


    const value = {
        currentUser,
        signUp,
        login,
        logout,
        passwordReset,
    }

  return (
    <AuthContext.Provider value={value}>
          {children}

      </AuthContext.Provider>
  )
  
  

};


