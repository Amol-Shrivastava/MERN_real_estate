import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {showNotification} from "../util/common";

import {useDispatch, useSelector} from 'react-redux';

import {signInStart, signInFailure, signInSuccess} from "../redux/user/userSlice"

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function inputHandler(oEvent) {
    // debugger;
    setFormData({...formData, [oEvent.target.id]: oEvent.target.value});
  }

  async function submitHandler(oEvent) {
    try {
      oEvent.preventDefault();
      // setIsLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const {success,message} = await res.json();
      
      if(success) {
        dispatch(signInSuccess(message))
        setNotification({success, message:'Successfully logged in...'});
        setTimeout(navigate('/'), 500)
        return;
      }
    
      dispatch(signInFailure(message))
  
    // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    }finally {
      // setIsLoading(false);
      // setFormData({});
      // dispatch(signInFailure())
      // setNotification({})
      document.getElementById('SignInForm').reset();
    }
  }

  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-bold my-7'>
        Sign In
      </h1>
      <form id='SignInForm' className='flex flex-col gap-3' onSubmit={submitHandler}>
        <input type="email" name="email" id="email" className='border p-3 rounded-lg focus:shadow-inner shadow-sm focus:outline-none' onChange={inputHandler} placeholder="Email" />
        <input type="password" name="password" id="password" className='border p-3 rounded-lg shadow-sm focus:shadow-inner focus:outline-none' onChange={inputHandler} placeholder="Password" />
        <button type="submit" disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-3">{loading ? 'Loading...':'Sign In'}</button>
      </form>
      <div>
        <p className='font-semibold text-black mt-4'>Donot have an account? 
        <Link to="/sign-up">
          <span className='text-blue-400 visited:text-purple-600 font-normal'> Signup</span>
        </Link>
        </p>
      </div>
      <p className='text-green-600 visible:hidden' id="userCreationSuccessMsg"></p>
      <p className='text-red-600 visible:hidden' id="userCreationFailedMsg" ></p>
     {(notification && notification.success) ? showNotification('userCreationSuccessMsg', {message: notification.message}): null}
     {(notification && !notification.success) ? showNotification('userCreationFailedMsg',{message: notification.message}): null}
     
    </div>
  )
}

export default SignIn