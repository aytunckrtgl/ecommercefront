import React, { useState } from "react";
import AddressShow from './AddressShow';

function AddressPage() {
  const [formInput, setFormInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = JSON.parse(sessionStorage.getItem("formData"));
    const id = formData.id;
    const url = `http://localhost:8080/address/${id}/add`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: formInput,
    })
      .then((response) => response.text()) // response.text() metodu ile yanıtın metin versiyonunu elde edin
      .then((data) => console.log(data)) // Yanıtı konsola yazdırın
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    setFormInput(e.target.value);
  };

  return (
    <div>
      <h1>Add Address</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={formInput} onChange={handleInputChange} />
        </label>
        <button type="submit">Add</button>
      </form>
      <AddressShow />
      
    </div>
    
  );
}

export default AddressPage;
