import React from 'react';

const PropertyCard = ({ property }) => (
    <div className='property-details' >
        <h3 className='property-card'>{property.title}</h3>
        <img src={property.image} alt={property.title} className="property-image" />
        <p className='property-card'>{property.location}</p>
        <p className='property-card'>{property.description}</p>
        <p className='property-card'>Rs{property.price}</p>
    </div>
);

export default PropertyCard;
