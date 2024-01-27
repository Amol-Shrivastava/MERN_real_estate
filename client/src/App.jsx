import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, Profile, About, SignIn, SignUp, CreateListing} from './pages'

//components
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';


const App = () => {
//  console.log('hello');
  return (
    <BrowserRouter>
    <Header />
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
      </Route>
      
     </Routes>
    </BrowserRouter>
  )
}

export default App