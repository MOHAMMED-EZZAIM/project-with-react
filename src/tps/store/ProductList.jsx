import React, { useEffect, useState } from 'react';
import Product from './Product.jsx';

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [originalProductList, setOriginalProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getProduits = () => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProductList(data);
        setOriginalProductList(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  };

  const displayCategories = () => {
    return categories.map((category, index) => (
      <button
        key={index}
        className={`btn ${selectedCategory === category ? 'btn-secondary active' : 'btn-outline-secondary'}`}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </button>
    ));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    // Filter products based on the selected category
    const filteredList = originalProductList.filter(product =>
      product.category === category
    );

    setProductList(filteredList);
  };

  const displayProducts = () => {
    const filteredProducts = productList.filter(product =>
      product.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.description.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.id.toString().includes(searchInput.toLowerCase())
    );

    return filteredProducts.map((product, key) => (
      <Product product={product} key={key} />
    ));
  };

  useEffect(() => {
    getProduits();
    getCategories();
  }, []);

  const handleSearch = e => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    if (inputValue === '') {
      setProductList(originalProductList);
    } else {
      const filteredList = originalProductList.filter(produit =>
        produit.title.toLowerCase().includes(inputValue) ||
        produit.description.toLowerCase().includes(inputValue) ||
        produit.id.toString().includes(inputValue)
      );
      setProductList(filteredList);
    }
  };
  return (
    <div className='container-fluid mx-auto w-75 my-2'>
      <div>
        <h2 className="mb-3">Search:</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="Search" className="visually-hidden">Enter produit</label>
            <div className="input-group">
              <input
                type="text"
                onChange={handleSearch}
                className="form-control"
                id="Search"
                placeholder="Enter un produit"
              />
              <button type="submit" value="Search" id='btn' className="btn btn-primary">Acheter</button>
            </div>
          </div>
        </form>
      </div>

      <h5>Categories:</h5>
      <div className='btn-group mb-3'>
        {displayCategories()}
      </div>
      <hr />
      <h1>List des Produits:</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#d</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Image</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts()}
        </tbody>
      </table>
    </div>
  );
}
