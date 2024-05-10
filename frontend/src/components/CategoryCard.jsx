import React from 'react';

const CategoryCard = ({ imageSrc, title, href }) => {
  return (
    <li className="card">
      <img src={imageSrc} alt={title} />
      <h3>{title}</h3>
      <a href={href}>Browse {title} Appointments</a>
    </li>
  );
};

export default CategoryCard;