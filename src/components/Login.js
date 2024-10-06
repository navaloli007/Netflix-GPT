import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
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
                    <form className="w-3/12 text-white flex justify-center items-center flex-col p-10 bg-black opacity-85 rounded-lg">
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
                            type="text"
                            className="p-2 mt-3 w-full rounded-lg bg-gray-700"
                            placeholder="Email or phone number"
                        />
                        <input
                            type="password"
                            className="p-2 mt-3 w-full rounded-lg bg-gray-700"
                            placeholder="Password"
                        />
                        <button className="bg-red-600 rounded-lg p-2 mt-3 w-full">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                        {/* <div className="flex flex-row justify-between w-full mt-3">
                            <div className="flex items-center">
                                <input type="checkbox" />
                                <p className="ml-2">Remember me</p>
                            </div>
                            <p>Need Help?</p>
                        </div> */}
                        <div className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign up now." : "Already Registered? Sign In Now."}</div>
                    </form>
                </div>
            </div>
        </div>

        // <div>
        //     <Header />
        //     <div className='absolute'>
        //         <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_small.jpg" alt='bg-image' />
        //     </div>
        //     <form className='absolute w-3/12 flex justify-center align-middle flex-col bg-green-400 p-6'>
        //         <p className='text-5xl text-white'>Sign In</p>
        //         <input type='text' className='p-2 mt-3' placeholder='Email or phone number' />
        //         <input type='password' className='p-2 mt-3' placeholder='Password' />
        //         <button className='bg-red-600 text-white p-2 mt-3'>Sign In</button>
        //         <div className='flex flex-row  justify-between'>
        //             <div className='flex items-center'>
        //                 <input type="checkbox" /><p>Remember me</p>
        //             </div>
        //             <p>Need Help?</p>
        //         </div>
        //     </form>
        // </div>
    )
}

export default Login