import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UpdateListing from './pages/UpdateListing';
import { CreateListing } from './pages/CreateListing';
import Listing from './pages/Listing'
import Search from './pages/Search';
import Blogs from './pages/Blogs';
import Services from './pages/Services';
import DataServices from './pages/ServicesData';
import MachineServices from './pages/ServicesMachine';
import ServicesBI from './pages/ServicesBI';


export default function App(){
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<SignIn />} />        
    <Route path='/contact' element={<Contact />} />
    <Route path='/search' element={<Search />} />
    <Route path='/blogs' element={<Blogs />} />
    <Route path='/services' element={<Services />} />
    <Route path='/dataservices' element={<DataServices />} />
    <Route path='/machineservices' element={<MachineServices />} />
    <Route path='/biservices' element={<ServicesBI />} />
    <Route path='/listing/:listingId' element={<Listing />} />    
    <Route element={<PrivateRoute />} >
      <Route path='/profile' element={<Profile />} />
      <Route path='/create-listing' element={<CreateListing />} />
      <Route path='/update-listing/:listingId' element={<UpdateListing />} />
    </Route>
    
  </Routes>  
  </BrowserRouter>
};