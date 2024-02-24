import React, {useState, useRef} from 'react';
import {useSelector} from 'react-redux'
import LisitingCard from '../components/LisitingCard';
import { RxHamburgerMenu } from "react-icons/rx";


function ShowUserListing({listings, setListings}) {
    const {userListings: data} = useSelector(state => state.listing)
    let {data: dataArr} = data;
    const navRef = useRef();
    const [showNav, setShowNav] = useState(true);
    // debugger;

    const showNavFunc = () => {
        setShowNav(!showNav);
        // debugger;
    }
    
  return (
    <div>
        <h3 className='text-center font-semibold text-2xl my-8'>Your Listings</h3>
        <main className='flex relative overflow-x-hidden'>
            <div className=' border border-gray-700'>
                <div className='absolute visible md:hidden -top-10' onClick={() => showNavFunc()}>
                    <RxHamburgerMenu size={28} className='cursor-pointer pointer-events-none'/>
                </div>
               { showNav && 
                <aside ref={navRef} className='min-h-full w-full md:relative md:w-auto flex items-center flex-col bg-slate-800 text-gray-400 md:max-w-lg p-2 gap-16 md:gap-4 border '>
                        <section>
                            <p>Filter by price</p>
                        </section>
                        <section>
                            <p>Filter by Rating</p>
                        </section>
                        <section>
                            <p>Filter by type(SALE/RENT)</p>
                        </section>
                        <section>
                            <p>Filter by compulsory facilities</p>
                        </section>
                    </aside>
                }
            </div>
            <div className='border flex flex-1 flex-wrap gap-6 justify-center md:justify-normal'>
                {dataArr && dataArr.length && dataArr.map(({_id, imageUrlsArr, name, description}) => <LisitingCard key={_id} imageUrlsArr={imageUrlsArr} name={name} description={description} id={_id} setListings={setListings}/>)}
            </div>
        </main>
    </div>
  )
}

export default ShowUserListing