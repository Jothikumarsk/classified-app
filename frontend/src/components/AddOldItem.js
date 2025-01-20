import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddOldItem = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        seller: "",
        contact: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Assumes token is stored in localStorage
             await axios.post(
                "http://localhost:5000/api/old-items",
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            alert("Old item added successfully!");
            navigate("/old-items");
        } catch (err) {
            console.error("Error adding old item:", err.response?.data || err.message);
            alert(err.response?.data.message || "Error adding item");
        }
    };

    return (
        <div>
            <h1>Add Old Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Seller:</label>
                    <input
                        type="text"
                        name="seller"
                        value={formData.seller}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label> <input name="image" placeholder="Image URL" onChange={handleChange} /></div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddOldItem;
