// Navbar.js
import React, { useState } from 'react';
import '../assets/css/Navbar.css';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({
  selectedLanguage,
  onLanguageChange,
  likedCount,
  likedProducts,
  products
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLikedList, setShowLikedList] = useState(false);


  const navigate = useNavigate(); // Initialize the navigate function

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const toggleLikedList = () => setShowLikedList(prev => !prev);


  const handleUserIconClick = () => {
    navigate('/auth'); // Navigate to the auth page when user clicks on the icon
  };

  return (
    <header className="navbar">
      <div className="top-bar">
        <div className="logo">LOGO</div>
        <div className="nav-icons">
          <FaSearch className="icon" />

          {/* ❤️ Heart with count */}
          <div className="icon heart-icon-wrapper" onClick={toggleLikedList}>
            <FaHeart className="icon" />
            {likedCount > 0 && <span className="badge">{likedCount}</span>}
          </div>

          <FaShoppingCart className="icon" />
          {/* <FaUser className="icon" /> */}
          <FaUser className="icon" onClick={handleUserIconClick} /> 

          <div className="language-selector" onClick={toggleDropdown}>
            <span>{selectedLanguage}</span>
            {showDropdown && (
              <div className="language-dropdown">
                <button onClick={() => onLanguageChange('English')}>English</button>
                <button onClick={() => onLanguageChange('Marathi')}>Marathi</button>
                <button onClick={() => onLanguageChange('Hindi')}>Hindi</button>
              </div>
            )}
          </div>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Skill</a></li>
        <li><a href="#">Stories</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>

      {/* 💖 Liked Product List Popup */}
      {showLikedList && (
        <div className="liked-product-popup">
          <h3>❤️ Liked Products</h3>
          {likedProducts.length === 0 ? (
            <p>No liked products yet.</p>
          ) : (
            likedProducts.map((id) => {
              const product = products.find(p => p.id === id);
              return (
                <div key={id} className="liked-product-item">
                  <img src={product?.image} alt={product?.title} />
                  <span>{product?.title}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
