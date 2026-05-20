import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CartSlice';

function ProductList() {
  const dispatch = useDispatch();

  const [addedItems, setAddedItems] = useState([]);

  const plants = [
    { id: 1, name: 'Aloe Vera', price: 10, category: 'Succulents', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Snake Plant', price: 15, category: 'Succulents', image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Cactus', price: 12, category: 'Succulents', image: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Peace Lily', price: 20, category: 'Flowering', image: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Orchid', price: 25, category: 'Flowering', image: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Rose Plant', price: 18, category: 'Flowering', image: 'https://via.placeholder.com/100' },
    { id: 7, name: 'Fern', price: 16, category: 'Indoor', image: 'https://via.placeholder.com/100' },
    { id: 8, name: 'Money Plant', price: 14, category: 'Indoor', image: 'https://via.placeholder.com/100' },
    { id: 9, name: 'Spider Plant', price: 11, category: 'Indoor', image: 'https://via.placeholder.com/100' }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));

    setAddedItems([...addedItems, plant.id]);
  };

  return (
    <div>
      <nav>
        <h2>Paradise Nursery</h2>

        <ul>
          <li>Home</li>
          <li>Plants</li>
          <li>Cart</li>
        </ul>
      </nav>

      {['Succulents', 'Flowering', 'Indoor'].map(category => (
        <div key={category}>
          <h2>{category}</h2>

          {plants
            .filter(plant => plant.category === category)
            .map(plant => (
              <div key={plant.id}>
                <img src={plant.image} alt={plant.name} />

                <h3>{plant.name}</h3>

                <p>${plant.price}</p>

                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems.includes(plant.id)}
                >
                  {addedItems.includes(plant.id)
                    ? 'Added'
                    : 'Add to Cart'}
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
