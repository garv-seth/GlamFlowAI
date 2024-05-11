import './App.css';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SalonSearch from './components/Salon/SalonSearch';
import SalonDetail from './components/Salon/SalonDetail';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentList from './components/AppointmentList';
import UserProfile from './pages/UserProfile';
import AboutUs from './pages/AboutUs';
function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
      <Navbar />
      <Routes>
  <Route path="/" element={<HomePage />} /> 
  <Route path="/landing" element={<LandingPage />} /> 
  <Route path="/appointments" element={<AppointmentList />} /> 
  <Route path="/salon-search" element={<SalonSearch />} /> 
  <Route path="/salon-details" element={<SalonDetail />} />
  <Route path="/my-profile" element={<UserProfile />} />
  <Route path="/about-us" element={<AboutUs />} />
</Routes>

      </ChakraProvider>
      </BrowserRouter>
  );
}

export default App;
