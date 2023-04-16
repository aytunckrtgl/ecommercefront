import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formDataFromStorage = JSON.parse(sessionStorage.getItem('formData'));
  const initialFormData = formDataFromStorage || { username: "", password: "" };

  const cartLink = formDataFromStorage ? `/cart/${formDataFromStorage.id}` : '/cart';

  return (
    <>      
      <Link to="/">Anasayfa</Link>{'      '}
      {initialFormData.username && initialFormData.password ? (
        <>
        
          <ul>
          <Link to="/address">Adreslerim</Link>{'      '}
          <Link to={cartLink}>Sepetim</Link>{'      '}
          <Link to="/logout">Çıkış yap</Link><br/>
            Hoşgeldiniz: {initialFormData.username}
            
          </ul>
        </>
      ) : (
        <>
        
          <Link to="/RegisterPage">Kayıt Ol</Link>{'      '}
          <Link to="/LoginPage">Giriş Yap</Link>
        </>
      )}
    </>
  );
}

export default NavBar;
