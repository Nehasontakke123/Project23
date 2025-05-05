// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/fakeApi.jsx';
import ProductCard from '../components/ProductCard.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };
    fetchProductData();
  }, []);

  const applyFilters = (filters) => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      filtered = filtered.filter(
        (product) =>
          product.price >= parseInt(min) && product.price <= parseInt(max)
      );
    }

    if (filters.color) {
      filtered = filtered.filter(
        (product) => product.color === filters.color
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="home-page">
      <h1>DISCOVER OUR PRODUCTS</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        justo quis odio luctus, vel bibendum nisl ultrices. Nullam dapibus
        libero vel lorem dictum, sed venenatis risus efficitur.
      </p>
      <div className="content-container">
        <FilterSidebar onFilterChange={applyFilters} />
        <div className="product-grid">
          {loading ? (
            <div className="loading-spinner">
              <span>Loading...</span>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;