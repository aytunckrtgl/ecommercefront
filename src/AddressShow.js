import React, { useEffect, useState } from "react";

function AddressShow() {
  const [addresses, setAddresses] = useState([]);
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const userId = formData.id;

  const fetchAddresses = () => {
    const url = `http://localhost:8080/address/${userId}/show`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAddresses(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]); // userId değiştiğinde adresleri yeniden yükle

  return (
    <div>
      <h1>Addresseslerin</h1>
      <ul>
        {addresses.map((address) => (
          <li key={address.addressId}>{address.addressLine}</li>
        ))}
      </ul>
    </div>
  );
}

export default AddressShow;
