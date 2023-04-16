import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

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
          sessionStorage.setItem(
            "formData",
            JSON.stringify({
              id: data,
              username: formData.username,
              password: formData.password,
            })
          );
          alert('Giriş Başarılı!');
          navigate('/');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Giriş Yapın</h1>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {loginError && <p>Username or password is incorrect.</p>}
    </>
  );
}

export default LoginPage;
