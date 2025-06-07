
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from './../hooks/useAxiosPublic';

export const AuthContext = createContext(null)



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()


    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    // const githubLogin = () => {
    //     const provider = new GithubAuthProvider();
    //     return signInWithPopup(auth, provider)
    // }

    const updateProfileInfo = (name, photo) => {
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    const logOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            const userInfo = { email: currentUser?.email }
            if (currentUser) {
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
            }
            
            setLoading(false)
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [axiosPublic]);

    const authInfo = {
        user, setUser, signInUser, signUpUser, googleLogin, updateProfileInfo, logOutUser, loading, setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;