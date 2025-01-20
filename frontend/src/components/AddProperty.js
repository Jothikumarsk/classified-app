import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        image: ''
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/login'); // Redirect unauthenticated users to login
        return null;
    }



    if (user?.role !== 'admin') {
        navigate('/'); // Redirect non-admins to Home
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://classified-app.onrender.com/api/properties', formData);
            alert('Property added successfully');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" onChange={handleChange} required />
            <input name="description" placeholder="Description" onChange={handleChange} required />
            <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
            <input name="location" placeholder="Location" onChange={handleChange} required />
            <input name="image" placeholder="Image URL" onChange={handleChange} />
            <button type="submit">Add Property</button>
        </form>
    );
};

export default AddProperty;
