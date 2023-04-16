import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Deneme(props){
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(props.loginSuccess || false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();

      fetch("http://localhost:8080/account/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          alert('Kayıt Başarılı!');
          setLoginSuccess(true);
          sessionStorage.setItem('formData', JSON.stringify(formData));
          console.log("kaydetmiş olması lazım")
          LoginOl();
          console.log(formData.id);     
          console.log(formData.username);  
          navigate('/');     
          window.location.reload();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });

        
  };

  const LoginOl = () => {
    fetch("http://localhost:8080/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data === -1) {
          setLoginError(true);
        } else {
          setLoginError(false);
          const updatedFormData = {
            id: data,
            username: formData.username,
            password: formData.password,
          };
          sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
          setFormData(updatedFormData);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  

  return (
     <>   
       <br/>
       <h1 >Kayıt Ol</h1> 
       <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(event) => setFormData({ ...formData, username: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
          />
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
     
     </>
     
  );
}

export default Deneme;
