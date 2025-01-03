import React, { useRef, useState } from 'react'
import Header from './Header'
import { validateEmailPassword } from "../utils/validate"
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { bgIMG, photoURL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch()

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const signInSinupBtn = () => {
        const message = validateEmailPassword(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: photoURL
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }
    return (
        <div>
            <Header />
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    <img
                        src={bgIMG}
                        alt="bg-image"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <form onSubmit={(e) => e.preventDefault()} className="w-3/12 text-white flex justify-center items-center flex-col p-10 bg-black opacity-85 rounded-lg">
                        <p className="text-5xl ">{isSignInForm ? "Sign In" : "Sign Up"}</p>
                        {
                            !isSignInForm && (
                                <input
                                    type="text" ref={name}
                                    className="p-2 mt-3 w-full rounded-lg bg-gray-700"
                                    placeholder="Full Name"
                                />
                            )
                        }
                        <input
                            ref={email}
                            type="text"
                            className="p-2 mt-3 w-full rounded-lg bg-gray-700"
                            placeholder="Email or phone number"
                        />
                        <input
                            ref={password}
                            type="password"
                            className="p-2 mt-3 w-full rounded-lg bg-gray-700"
                            placeholder="Password"
                        />
                        <p className='text-red-600 py-2 font-bold text-lg'>{errorMessage}</p>
                        <button className="bg-red-600 rounded-lg p-2 mt-3 w-full" onClick={signInSinupBtn}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                        <div className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign up now." : "Already Registered? Sign In Now."}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login