import React, { useState, useEffect } from 'react';
import Deneme from './Deneme';
import { Link , useParams} from 'react-router-dom';

function ProductPage() {
  const { productId } = useParams(); // URL'deki categoryId parametresini al
  const [product, setProduct] = useState([]);
  const [cartIdState, setCartIdState] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/product/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));

    const formData = JSON.parse(sessionStorage.getItem('formData'));
    if (formData) {
      setCartIdState(formData.id);
      setIsLoggedin(true);
    }
  }, [productId]);

  const addToCart = (cartId, productId) => {
    if (!isLoggedin) {
      alert('Lütfen önce hesabınıza giriş yapın ya da hesap oluşturun!');
      return;
    }
      alert('Ürün Sepetinize Eklenmiştir!');
    const url = `http://localhost:8080/cart/add/${cartId}/${productId}`;
    console.log('Request URL:', url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding product to cart');
        }
        console.log('Product added to cart successfully');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Short Description: {product.shortDescription}</p>
      <p>Long Description: {product.longDescription}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => addToCart(cartIdState, productId)}>
        Add to Cart
      </button>      
    </div>
  );
}

export default ProductPage;
