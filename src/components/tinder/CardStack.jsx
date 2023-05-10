
import React, { useState } from 'react';


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
    <>
    </>
  );
};

export default CardStack;
