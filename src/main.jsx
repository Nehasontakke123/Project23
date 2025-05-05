import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Get the root element
const root = createRoot(document.getElementById('root')); // Initialize createRoot with the root element

// Render the app wrapped with BrowserRouter
root.render(
  <StrictMode>
    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
