import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.categoryId}>
            <Link to={`/category/${category.categoryId}`}>{category.categoryName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
