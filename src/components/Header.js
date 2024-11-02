import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toogleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }
    const handleGPTSearchClick = () => {
        dispatch(toogleGptSearchView());
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed In / Sign Up
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });
        // Unsubsribe when components unmounts
        return () => unsubscribe();
        // }, []);
    }, [dispatch, navigate]);
    return (
        <div className='absolute w-screen z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
            <img className='w-44' src={LOGO} alt='logo' />
            {user && <div className='flex p-4'>
                {/* add icon later */}
                {showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>}
                <button className='py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg'
                    onClick={handleGPTSearchClick}
                >{showGptSearch ? "Home Page" : "GPT Search"}</button>
                <img className='w-12 h12' alt='usericon'
                    src={user?.photoURL} />
                <button onClick={handleSignout} className='font-bold text-white'>(Sign Out)</button>
            </div>
            }
        </div>
    )
}

export default Header