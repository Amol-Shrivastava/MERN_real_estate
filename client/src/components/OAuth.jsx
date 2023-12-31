import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';

import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
         try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const {user: {photoURL, displayName, email} = {user: 'No value found'}} = await signInWithPopup(auth, provider);
            if(photoURL && displayName && email) {
                const res = await fetch('/api/v1/auth/google',  {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      displayName,
                      email,
                      photoURL
                    })
                })

                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/')
            }


         } catch (error) {
            console.log('Could not sign in with google ', error)
         }
    }

  return (
    <button type='button' onClick={handleGoogleClick} className="bg-red-700 text-white p-3 rounded-lg uppercase w-100 hover:opacity-95">Continue with Google</button>
  )
}

export default OAuth