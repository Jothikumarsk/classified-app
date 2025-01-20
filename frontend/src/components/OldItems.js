import React, { useEffect, useState } from "react";
import API from '../api'

const OldItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await API.get("old-items");
                setItems(response.data);
            } catch (err) {
                console.error("Error fetching old items:", err);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="container">
            <h1>Old Items Sale</h1>
            <div className='property-container' >
                {items.map((item) => (
                    <div key = {item.id}>
                        <h3 className='property-card'>{item.title}</h3>
                        <img src={item.image} alt= '' className='item-image' />
                        <p className='property-card'>{item.description}</p>
                        <p className='property-card'>Price: ₹{item.price}</p>
                        <p className='property-card'>Seller: {item.seller}</p>
                        <p className='property-card'>Contact: {item.contact}</p>
                   </div>
                ))}
            </div>
        </div>
    );
};

export default OldItems;
