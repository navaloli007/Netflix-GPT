import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user);
    const handleSignout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
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
                <img className='w-12 h12' alt='usericon'
                    src={user?.photoURL} />
                <button onClick={handleSignout} className='font-bold text-white'>(Sign Out)</button>
            </div>
            }
        </div>
    )
}

export default Header