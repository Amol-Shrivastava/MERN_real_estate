import {useState} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

function Createlisting() {
  const [files, setFiles] = useState({});
  const [formData, setFormData] = useState({
    imageUrlsArr: [],
    otherDetails: {
      name: '',
      description: '',
      address: '',
      type: 'rent',
      bedrooms: 1,
      bathrooms: 1,
      regularPrice: 0,
      discountPrice: 0,
      offer: false,
      parking: false,
      furniture: false
    }
  });
  const [imageUploadError, setImageUploadError] = useState({success: false, msg: ''});
  const [uploading, setUploading] = useState(false);

  console.log(formData)
  const handleImgsUpload = async () => {
      try {
        if(files.length && (files.length+formData.imageUrlsArr.length) < 7) {
          const promises = [];
          setUploading({success: false, msg: ''});
          setImageUploadError(false)
          for(let i=0; i<files.length; ++i) {
            if(files[i].size < 2000000) {
              promises.push(storeImage(files[i]))
            }else {
              setImageUploadError({success: true, msg:`Image ${files[i].name} is more than 2MB, cannot upload...`})
              return;
            }
          }
          
          let imageUrls = await Promise.all(promises);
          setUploading(false)
          if(!(imageUrls instanceof Error)){
            setFormData({...formData, imageUrlsArr: formData.imageUrlsArr.concat(imageUrls)})
          }

          setImageUploadError({success: false, msg: 'Image uploaded without any error'})
        }else {
          setImageUploadError({success: true, msg: 'You cannot upload more than 6 images per listing.'})
          setUploading(false);
          return;
        }
      } catch (error) {
        setUploading(false)
        setImageUploadError({success: true, msg: 'Image upload failed (2mb max per image size)'})
      }
  }

  const storeImage = async (file) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const storage = getStorage(app);
      const fileName = Date().now + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      //promise to handle => upload functionality
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(progress)
          },
          error => new Error(error),
          //promise to handle => retrieval of image url over network
          async () => {
            let imgUrls = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({imgUrls, fileName: file.name})
          }
        )
      })
    } catch (error) {
      throw(error)
    }
  }

  const handleImageDeletion = (index) => {
    setFormData({
      ...formData,
      imageUrlsArr: formData.imageUrlsArr.filter((_, i) => i !== index)
    })
  }

  const handleInput = e => {
    let {id, value} = e.target;
    let updateType = formData.otherDetails.type;

    if(id=='sale') updateType = 'sale'
    if(id == 'renting') updateType = 'rent';

    
    if(id=='parking' || id=='furniture' || id=='offer') value = e.target.checked;
    
    if(id=='bathrooms' || id == 'bedrooms' || id== 'regularPrice' || id=='discountPrice') value = Number(value);


    setFormData({...formData, otherDetails: {...formData.otherDetails, [id]: value, type: updateType}})
    

  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-8'>
        Create a Listing
      </h1>
      <form className='flex sm:flex-row flex-col gap-6'>
          <div className='flex flex-col gap-4 flex-1'>
            <input type="text" name="name" id="name" className='border p-3 rounded-lg' placeholder='Name' maxLength={'62'} minLength={'10'} required onChange={handleInput} value={formData.otherDetails.name}/>

            <textarea type="text" name="desc" id="description" className='border p-3 rounded-lg' placeholder='Description' value={formData.otherDetails.description} onChange={handleInput} required/>

            <input type="text" name="address" id="address" className='border p-3 rounded-lg' value={formData.otherDetails.address} onChange={handleInput} placeholder='Address' required/>
          
            <div className='flex gap-4 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" name="type" id="sale" className='w-5' value={formData.otherDetails.type} onChange={handleInput} checked={formData.otherDetails.type == 'sale'}/>
                <span>Sale</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" value={formData.otherDetails.type} onChange={handleInput} name="type" id="renting" className='w-5' checked={formData.otherDetails.type == 'rent'}/>
                <span>Renting</span>
              </div>
          
              
              <div className='flex gap-2'>
                <input type="checkbox" name="parking" id="parking" className='w-5' value={formData.otherDetails.parking} checked={formData.otherDetails.parking} onChange={handleInput}/>
                <span>Parking Spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" name="furniture" id="furniture" className='w-5' value={formData.otherDetails.furniture} checked={formData.otherDetails.furniture} onChange={handleInput}/>
                <span>Furniture</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" name="offer" id="offer" className='w-5' value={formData.otherDetails.offer} checked={formData.otherDetails.offer} onChange={handleInput}/>
                <span>Offer</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='flex items-center gap-2'>
                <input type="number" name="bedrooms" id="bedrooms" min='1' max='10' required className='border border-gray-300 rounded-lg p-1' value={formData.otherDetails.bedrooms} onChange={handleInput}/>
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="bathrooms" id="bathrooms" min='1' max='10' required className='border border-gray-300 rounded-lg p-1' value={formData.otherDetails.bathrooms} onChange={handleInput}/>
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="regularPrice"  id="regularPrice" min='1' max='10' required className='border border-gray-300 rounded-lg p-1' value={formData.otherDetails.regularPrice}  onChange={handleInput}/>
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className='text-sm'>($ / month)</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="discountPrice" id="discountPrice" min='1' max='10' required className='border border-gray-300 rounded-lg p-1' value={formData.otherDetails.discountPrice} onChange={handleInput}/>
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className='text-sm'>($ / month)</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <p className='font-semibold'>Images:
              <span className='font-normal text-gray-500 ml-2'> The first Image will be the cover (max 6)</span>
            </p>
            <div className='flex gap-4 mt-4'>
              <input className='p-2 border border-green-300 rounded w-full' type="file" name="listImgs" id="listImgs" accept='image/*' multiple onChange={(e) => setFiles(e.target.files)}/>
              <button type='button' className='p-3 bg-green-700 text-white border border-green-700 hover:opacity-90 rounded uppercase disabled:opacity-60 disabled:bg-slate-500 disabled:text-gray-800 cursor-pointer' onClick={handleImgsUpload}>{
                uploading ? 'Uploading....' : 'Upload'
              }</button>
            </div>
            <p className='text-red-700'>{imageUploadError.success && imageUploadError.msg}</p>
            {
              formData.imageUrlsArr.length && formData.imageUrlsArr.map(({imgUrls, fileName}, index) => (
                <div key={imgUrls} className='flex justify-between p-2 border items-center my-2'>
                   <div className='flex items-center justify-between p-2'>
                    <img src={imgUrls} alt="listing-image"  className='w-24 h-24 object-contain rounded-lg ' />
                    <p className='text-sm text-gray-700'>{fileName}</p>
                   </div>
                   <button type='button' onClick={() => handleImageDeletion(index)} className='p-3 text-red-700 cursor-pointer rounded-lg uppercase hover:opacity-75'>Delete</button>
                </div>
              ))
            }
           
            <button type="submit" className='mt-4 p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-50'>Create Listing</button>
          </div>
      </form>

    </main>
  )
}

export default Createlisting