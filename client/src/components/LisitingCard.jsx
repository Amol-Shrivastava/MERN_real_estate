import React from 'react'

function LisitingCard({imageUrlsArr, name, description}) {
  return (
    <>
    <div className='flex align-middle justify-between my-6 p-2 border '>
        <div className='flex items-center'>
            <img src={imageUrlsArr[0].imgUrls} alt={name} className='w-20 h-20 object-contain' />
            <h3 className='font-bold ml-4 flex-1 truncate hover:underline cursor-pointer'>{name}</h3>
        </div>
        <div className='flex flex-col gap-2'>
            <button className='text-green-700 cursor-pointer'>EDIT</button>
            <button className='text-red-700 cursor-pointer'>DELETE</button>
        </div>
    </div>
    </>
  )
}

export default LisitingCard