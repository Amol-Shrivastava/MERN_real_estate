import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, Profile, About, SignIn, SignUp, CreateListing, ShowUserListing} from './pages'

//components
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';
import {useState} from 'react';


const App = () => {
//  console.luseStateog('hello');
const [listings, setListings] = useState(null)
  return (
    <BrowserRouter>
    <Header />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile listings={listings} setListings={setListings}/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path='/user-listings' element={<ShowUserListing listings={listings} setListings={setListings}/>}/>
      </Route>
      
     </Routes>
    </BrowserRouter>
  )
}

export default App