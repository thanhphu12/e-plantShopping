import { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div>
      {!showProductList ? (
        <div>
          <h1>Welcome to Paradise Nursery</h1>

          <button onClick={() => setShowProductList(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
