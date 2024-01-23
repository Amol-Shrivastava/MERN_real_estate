import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const {currentUser: {message}, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
 
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  console.log(formData)


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
          console.log(downloadURL);
        }
      )}
    );
  };

  const updateHandler = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      dispatch(updateUserStart())
      const res = await fetch(`/api/v1/user/update/${message._id}`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if(!data.success){
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data))

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
   

   return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex align-middle flex-col' onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={e => setFile(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={formData.avatar ?? message.avatar} alt={message.username}
         className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'/>
          <p className='flex justify-center mt-6'>
            {
              fileUploadError ? 
              <span className='text-red-700 text-center'>Error in Image Upload (Image must be less than 2MB)</span>
              : 
              filePerc > 0 && filePerc < 100 ? 
              (
                <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
              ) :
              (
                filePerc === 100 ? (
                  <span className='text-green-700 text-center'>Image Uploaded Succesfully</span>
                ):
                ("")
              )
            }
          </p>
        
        <input defaultValue={message.username} type='text' placeholder='username' id='username' className='p-1.5 mt-14 rounded-lg border' onChange={updateHandler}  name="username" />
        <input defaultValue={message.email} type='text' placeholder='email' id='email' className='p-1.5 my-3 rounded-lg border' onChange={updateHandler}  name="email"  />
        <input type='password' placeholder='password' id='password' className='p-1.5 rounded-lg border mb-6'  onChange={updateHandler} name="password"/>
        
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...':'Update'}</button> 
      </form>
      <div className='flex justify-between mt-5'>
        <span className="text-red-700 cursor-pointer">Delete Account</span>

        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile