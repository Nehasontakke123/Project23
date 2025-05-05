import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
// import './assets/css/Main.css';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm'; // Import AuthForm

// Sorting function
const sortProducts = (products, sortType) => {
  switch (sortType) {
    case 'PRICE: LOW TO HIGH':
      return [...products].sort((a, b) => a.price - b.price);
    case 'PRICE: HIGH TO LOW':
      return [...products].sort((a, b) => b.price - a.price);
    case 'NEWEST FIRST':
      return [...products].sort((a, b) => b.id - a.id);
    case 'POPULAR':
      return [...products]; // You can customize this
    default:
      return [...products]; // Default: Recommended
  }
};

// Filtering function
const applyFilters = (products, filters) => {
  return products.filter(product => {
    if (filters.customizable && !product.title.toLowerCase().includes('custom')) return false;
    if (filters.idealFor.length && !filters.idealFor.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.occasion.length && !filters.occasion.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.work.length && !filters.work.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.fabric.length && !filters.fabric.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.segment.length && !filters.segment.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.suitableFor.length && !filters.suitableFor.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.rawMaterials.length && !filters.rawMaterials.some(val => product.title.toLowerCase().includes(val))) return false;
    if (filters.pattern.length && !filters.pattern.some(val => product.title.toLowerCase().includes(val))) return false;
    return true;
  });
};

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [recommendedVisible, setRecommendedVisible] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState('RECOMMENDED');
  const [noMatch, setNoMatch] = useState(false);

  const [filters, setFilters] = useState({
    customizable: false,
    idealFor: [],
    occasion: [],
    work: [],
    fabric: [],
    segment: [],
    suitableFor: [],
    rawMaterials: [],
    pattern: []
  });

  // Translation dummy function
  const translateText = (text, lang) => {
    if (lang === 'Marathi') return `मराठीत: ${text}`;
    if (lang === 'Hindi') return `हिंदी में: ${text}`;
    return text;
  };

  const toggleLike = (id) => {
    setLikedProducts(prevLiked =>
      prevLiked.includes(id)
        ? prevLiked.filter(likedId => likedId !== id)
        : [...prevLiked, id]
    );
  };

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setAllProducts(data);
        const sorted = sortProducts(data, selectedSort);
        setProducts(sorted);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort whenever filters or sort type change
  useEffect(() => {
    let filtered = applyFilters(allProducts, filters);
    filtered = sortProducts(filtered, selectedSort);
    setProducts(filtered);
    setNoMatch(filtered.length === 0);
  }, [filters, selectedSort, allProducts]);

  // Handle filter change
  const handleFilterChange = (group, value = null) => {
    setFilters(prev => {
      if (group === 'customizable') {
        return { ...prev, customizable: !prev.customizable };
      }

      const current = prev[group];
      const updatedGroup = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      return { ...prev, [group]: updatedGroup };
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Navbar
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        likedCount={likedProducts.length}
        likedProducts={likedProducts}
        products={products}
      />

      <h1 className="main-heading">DISCOVER OUR PRODUCTS</h1>
      <p className="sub-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quisquam eveniet reiciendis officia quidem vitae?
      </p>

      <div className="filter-recommended-box">
        <div className="filter-recommended-section">
          <button onClick={() => setFilterVisible(!filterVisible)}>
            {filterVisible ? 'Hide Filter' : 'Show Filter'}
          </button>

          {filterVisible && (
            <div className="filter-panel">
              <label><input type="checkbox" onChange={() => handleFilterChange('customizable')} /> Customizable</label>

              <details><summary>IDEAL FOR</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('idealFor', 'men')} /> Men</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('idealFor', 'women')} /> Women</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('idealFor', 'kids')} /> Kids</label>
              </details>

              <details><summary>OCCASION</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('occasion', 'casual')} /> Casual</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('occasion', 'party')} /> Party</label>
              </details>

              <details><summary>WORK</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('work', 'embroidery')} /> Embroidery</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('work', 'printed')} /> Printed</label>
              </details>

              <details><summary>FABRIC</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('fabric', 'cotton')} /> Cotton</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('fabric', 'silk')} /> Silk</label>
              </details>

              <details><summary>SEGMENT</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('segment', 'ethnic')} /> Ethnic</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('segment', 'western')} /> Western</label>
              </details>

              <details><summary>SUITABLE FOR</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('suitableFor', 'summer')} /> Summer</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('suitableFor', 'winter')} /> Winter</label>
              </details>

              <details><summary>RAW MATERIALS</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('rawMaterials', 'organic')} /> Organic</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('rawMaterials', 'synthetic')} /> Synthetic</label>
              </details>

              <details><summary>PATTERN</summary>
                <label><input type="checkbox" onChange={() => handleFilterChange('pattern', 'striped')} /> Striped</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('pattern', 'plain')} /> Plain</label>
              </details>
            </div>
          )}
        </div>

        <div className="filter-recommended-section">
          <button onClick={() => setRecommendedVisible(!recommendedVisible)}>
            {selectedSort} ▼
          </button>
          {recommendedVisible && (
            <div className="dropdown">
              {['RECOMMENDED', 'NEWEST FIRST', 'POPULAR', 'PRICE: HIGH TO LOW', 'PRICE: LOW TO HIGH'].map((option) => (
                <button
                  key={option}
                  className={`dropdown-item ${selectedSort === option ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedSort(option);
                    setRecommendedVisible(false);
                  }}
                >
                  {selectedSort === option && '✔ '}
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {noMatch && (
        <div className="popup-message">
          No products found for selected filters. Please try different filters.
        </div>
      )}

      <div className="product-section">
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h2>{translateText(product.title, selectedLanguage)}</h2>
              <p>{translateText(product.description.slice(0, 100), selectedLanguage)}...</p>
              <p className="price">${product.price}</p>
              <button className="like-button" onClick={() => toggleLike(product.id)}>
                <i className={`fas fa-heart ${likedProducts.includes(product.id) ? 'liked' : ''}`}></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default App;





