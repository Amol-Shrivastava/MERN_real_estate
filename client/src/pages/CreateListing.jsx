import React from 'react'

function Createlisting() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-8'>
        Create a Listing
      </h1>
      <form className='flex sm:flex-row flex-col gap-6'>
          <div className='flex flex-col gap-4 flex-1'>
            <input type="text" name="listing-name" id="listing-name" className='border p-3 rounded-lg' placeholder='Name' maxLength={'62'} minLength={'10'} required/>

            <textarea type="text" name="listing-desc" id="listing-desc" className='border p-3 rounded-lg' placeholder='Description' required/>

            <input type="text" name="listing-address" id="listing-address" className='border p-3 rounded-lg' placeholder='Address' required/>
          
            <div className='flex gap-4 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" name="Sale" id="sale" className='w-5'/>
                <span>Sale</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" name="renting" id="renting" className='w-5'/>
                <span>Renting</span>
              </div>
          
              
              <div className='flex gap-2'>
                <input type="checkbox" name="Parking" id="Parking" className='w-5'/>
                <span>Parking Spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" name="furniture" id="furniture" className='w-5'/>
                <span>Furniture</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" name="offer" id="offer" className='w-5'/>
                <span>Offer</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-4'>
              <div className='flex items-center gap-2'>
                <input type="number" name="bedrooms" id="bedrooms" min='1' max='10' required className='border border-gray-300 rounded-lg p-1'/>
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="bathrooms" id="bathrooms" min='1' max='10' required className='border border-gray-300 rounded-lg p-1'/>
                <p>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="regPrice" id="regPrice" min='1' max='10' required className='border border-gray-300 rounded-lg p-1'/>
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className='text-sm'>($ / month)</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <input type="number" name="disPrice" id="disPrice" min='1' max='10' required className='border border-gray-300 rounded-lg p-1'/>
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
              <input className='p-2 border border-green-300 rounded w-full' type="file" name="listImgs" id="listImgs" accept='images/*' multiple />
              <button className='p-3 bg-green-700 text-white border border-green-700 hover:opacity-90 rounded uppercase disabled:opacity-60 disabled:bg-slate-500 disabled:text-gray-800 cursor-pointer'>Upload</button>
            </div>
            <button type="submit" className='mt-4 p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-50'>Create Listing</button>
          </div>
      </form>

    </main>
  )
}

export default Createlisting