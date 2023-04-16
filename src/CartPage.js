import { useEffect, useState } from 'react';
import AddressSelect from './AddressSelect';
import AddressShow from './AddressShow';

function CartPage({}) {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const formData = JSON.parse(sessionStorage.getItem('formData'));
    const id = formData?.id;
    setCartId(id);
    if (id) {
      fetch(`http://localhost:8080/cartl/${id}`)
        .then((response) => response.json())
        .then((data) => setCartProducts(data))
        .catch((error) => console.error(error));
    }
  }, []);

  const removeFromCart = (productId) => {
    if (!cartId) {
      return;
    }
    fetch(`http://localhost:8080/cart/remove/${cartId}/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error removing product from cart');
        }
        console.log('Product removed from cart successfully');
        // Call fetch function again to get updated data
        return fetch(`http://localhost:8080/cartl/${cartId}`);
      })
      .then((response) => response.json())
      .then((data) => setCartProducts(data))
      .catch((error) => console.error(error));
  };

  const handleCartLogout = (event) => {
    event.preventDefault();
    if (!cartId) {
      return;
    }
    fetch(`http://localhost:8080/cartl/${cartId}/delete`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting cart');
        }
        console.log('Cart deleted successfully');       
        alert('Satın alma başarılı!');
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  function creditCartHandle(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      <h2>Sepetim</h2>
      <ul>
        {cartProducts.map((cartProduct, index) => (
          <li key={index}>
            {cartProduct.product.name} - {cartProduct.product.price} -{' '}
            Ürün Sayısı {cartProduct.salesQuantity} - {cartProduct.product.shortDescription} -{' '}
             <br/> 
            <button onClick={() => removeFromCart(cartProduct.product.id)}>
              Remove from Cart
            </button>
            <br/>
            
          </li>
        ))}
      </ul>
      <AddressSelect />
      <br/>
      <form onSubmit={handleCartLogout}>
        Kredi kartı numarası :
        <input type="number" value={value} maxLength={16} onChange={creditCartHandle} />
        <br/>
        <br/>
        <button type="submit">Satın Al</button>
      </form>
      <br/>
      
    </div>
  );
}

export default CartPage;
