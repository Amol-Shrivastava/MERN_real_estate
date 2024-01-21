import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
// import { useDispatch } from 'react-redux';

const Profile = () => {
  const {currentUser, loading, error} = useSelector(state => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
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
        );
      }
    );
  };     

   return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex align-middle flex-col'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={e => setFile(e.target.files[0])} />
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt={currentUser.username}
         className='rounded-full h-24 w-24 object-cover self-center mt-2 cursor-pointer'/>
        <input type='text' placeholder='username' id='username' className='p-1.5 mt-14 rounded-lg border'/>
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