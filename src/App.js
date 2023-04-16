import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './CategoryList';
import CategoryPage from './CategoryPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import NavBar from './NavBar';
import Deneme from './Deneme';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import AddressPage from './AddressPage';
import React from 'react'


function App() {
  return (
    <>  
  
    <Router>
      <div>  
        <NavBar />      
        <Routes>
          <Route path="/" element={<CategoryList />} />    
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart/:cartId" element={<CartPage />} />   
          <Route path="/RegisterPage" element={<Deneme />} />   
          <Route path="/LoginPage" element={<LoginPage />} />   
          <Route path="/logout" element={<LogoutPage />} />   
          <Route path="/address" element={<AddressPage />} />   
          
     
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
