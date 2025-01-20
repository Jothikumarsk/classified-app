import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
            setProperty(response.data);
        };
        fetchProperty();
    }, [id]);

    if (!property) return <p>Loading...</p>;

    return (
        <div>
            <h1 className='property-card'>{property.title}</h1>
            <p className='property-card'>{property.description}</p>
            <p className='property-card'>${property.price}</p>
            <p className='property-card'>{property.location}</p>
        </div>
    );
};

export default PropertyDetails;
