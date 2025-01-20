const express = require('express');
const Property = require('../models/Property');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a property (Accessible only to Admins)
router.post('/', authenticate, authorizeAdmin, async (req, res) => {
    const { title, description, price, location, image } = req.body;
    const property = new Property({ title, description, price, location, image });
    try {
        const newProperty = await property.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.json(property);
    } catch (err) {
        res.status(404).json({ message: 'Property not found' });
    }
});

module.exports = router;
