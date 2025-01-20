const express = require("express");
const router = express.Router();
const OldItem = require("../models/OldItem");

// Get all old items
router.get("/", async (req, res) => {
    try {
        const oldItems = await OldItem.find();
        res.json(oldItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new old item
router.post("/", async (req, res) => {
    const { title, description, price, seller, contact, image } = req.body;

    const newOldItem = new OldItem({
        title,
        description,
        price,
        seller,
        contact,
        image,
    });

    try {
        const savedItem = await newOldItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an old item
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, seller, contact } = req.body;

    try {
        const updatedItem = await OldItem.findByIdAndUpdate(
            id,
            { title, description, price, seller, contact },
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an old item
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await OldItem.findByIdAndDelete(id);
        res.json({ message: "Old item deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
