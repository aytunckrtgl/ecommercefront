import React, { useState, useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';

function CategoryPage() {
  const { categoryId } = useParams(); // URL'deki categoryId parametresini al
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/products/${categoryId}`)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, [categoryId]);
  //BURAYA DİKKAT ET 

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.productId}>
            <Link to={`/product/${product.productId}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryPage;
