import {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {deleteUserListingStart, deleteUserListingSuccess, deleteUserListingError} from '../redux/user/userListingSlice.js'

function LisitingCard({imageUrlsArr, name, description, id, setListings}) {
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionMsg, setdeletionMsg] = useState({});
  
  let {userListings: data} = useSelector(state => state.listing)
  
  
  const dispatch = useDispatch();
  const handleDelete = async () => {
    // eslint-disable-next-line no-useless-catch
    try {

      setDeletionLoading(true);
      dispatch(deleteUserListingStart());
      
      let arr = data.data;
      arr = arr.filter(({_id}) => _id !== id);
      setListings(arr)

      const res = await fetch(`/api/v1/listing/delete-listing/${id}`, {
        method: 'DELETE'
      })
      const {success, message} = await res.json();
      setDeletionLoading(false)
      if(success) {
        setdeletionMsg({success: true, msg: message})
        dispatch(deleteUserListingSuccess({data: arr}));
      }else {
        dispatch(deleteUserListingError({data: message}))
        setdeletionMsg({success: false, msg: message})
      }
    } catch (error) {
      throw error;
    }
  }
  return (
    <>
    <div className='sm:w-full flex flex-col md:w-auto border border-gray-300 '>
        <div className='flex flex-col p-6 items-center'>
            <img src={imageUrlsArr[0].imgUrls} alt={name} className='w-60 h-60 object-cover' />
            <h3 className='font-bold flex-1 truncate  cursor-pointer text-gray-700 my-3'>{name}</h3>
        </div>
        <div className='flex justify-between p-4'>
            <button disabled={deletionLoading} className='text-green-700 cursor-pointer'>EDIT</button>
            <button disabled={deletionLoading} className='text-red-700 cursor-pointer' onClick={handleDelete}>
              {deletionLoading ? 'DELETING....' : 'DELETE'}
            </button>
        </div>
    </div>
       {deletionMsg.success && <p className={`{deletionMsg.success} ? 
       'text-green-700 block' : 'text-red-700 block'`}>{deletionMsg.msg}</p>}
    </>
  )
}

export default LisitingCard