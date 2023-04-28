
import React, { useState } from 'react';
import Swipeable from 'react-swipeable';

const Card = ({ image, name, description }) => {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

const CardStack = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Handle like
    } else if (direction === 'left') {
      // Handle dislike
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <Swipeable
      onSwipedLeft={() => handleSwipe('left')}
      onSwipedRight={() => handleSwipe('right')}
    >
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card-container ${
            index === currentIndex ? 'current' : ''
          }`}
        >
          {index >= currentIndex && (
            <Card
              image={card.image}
              name={card.name}
              description={card.description}
            />
          )}
        </div>
      ))}
    </Swipeable>
  );
};

export default CardStack;
