import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-3'>
        <input type="text" name="username" id="userInpt" className='border p-3 rounded-lg focus:shadow-inner shadow-sm focus:outline-none' placeholder="Username" />
        <input type="email" name="email" id="emailInpt" className='border p-3 rounded-lg focus:shadow-inner shadow-sm focus:outline-none' placeholder="Email" />
        <input type="password" name="password" id="passwordInpt" className='border p-3 rounded-lg shadow-sm focus:shadow-inner focus:outline-none' placeholder="Password" />
        <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-3">Sign Up</button>
      </form>
      <div>
        <p className='font-semibold text-black mt-4'>Have an account? 
        <Link to="/sign-in">
          <span className='text-blue-400 visited:text-purple-600 font-normal'> Signin</span>
        </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp