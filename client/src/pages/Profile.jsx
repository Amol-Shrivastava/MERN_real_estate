import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser: {message} = null} = useSelector(state => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex align-middle flex-col'>
        <img src={message.avatar} alt={message.username}
         className='rounded-full h-24 w-24 object-cover self-center mt-2'/>
        <input type='text' placeholder='username' id='username' className='p-1.5 mt-16 rounded-lg border'/>
        <input type='text' placeholder='email' id='email' className='p-1.5 my-3 rounded-lg border'/>
        <input type='password' placeholder='password' id='password' className='p-1.5 rounded-lg border mb-6'/>
        
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button> 
      </form>
      <div className='flex justify-between mt-5'>
        <span className="text-red-700 cursor-pointer">Delete Account</span>

        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile