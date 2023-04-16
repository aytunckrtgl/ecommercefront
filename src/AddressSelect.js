import React, { useEffect, useState } from "react";

function AddressSelect() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const formData = JSON.parse(sessionStorage.getItem("formData"));
  const userId = formData.id;

  const fetchAddresses = () => {
    const url = `http://localhost:8080/address/${userId}/show`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAddresses(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    const selectedId = parseInt(event.target.value);
    const selected = addresses.find((address) => address.addressId === selectedId);
    setSelectedAddress(selected);
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  return (
    <div>
      <h1>Addresseslerin</h1>
      <select onChange={handleChange}>
        <option value={null}>Adres Seç</option>
        {addresses.map((address) => (
          <option key={address.addressId} value={address.addressId}>
            {address.addressLine}
          </option>
        ))}
      </select>
      {selectedAddress && (
        <div>
          <h2>Seçilen Adres</h2>
          <p>{selectedAddress.addressLine}</p>
          <p>{selectedAddress.city}</p>
          <p>{selectedAddress.state}</p>
          <p>{selectedAddress.zipCode}</p>
        </div>
      )}
    </div>
  );
}

export default AddressSelect;
