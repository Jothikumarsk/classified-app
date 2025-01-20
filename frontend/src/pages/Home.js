import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await axios.get('http://localhost:5000/api/properties');
            setProperties(response.data);
        };
        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Available rental Properties</h1>
            <div className='property-container'>
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default Home;
