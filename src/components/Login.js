import React, { useRef, useState } from 'react'
import Header from './Header'
import { validateEmailPassword } from "../utils/validate"

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const signInSinupBtn = () => {
        setErrorMessage(validateEmailPassword(email.current.value, password.current.value));
    }
    return (
        <div>
            <Header />
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_small.jpg"
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
                                    type="text"
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