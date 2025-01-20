const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const bcrypt = require('bcryptjs');
const oldItemsRoute = require("./routes/oldItems");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/properties', propertyRoutes);

// Use the auth routes
app.use('/api/auth', authRoutes);

app.use("/api/old-items", oldItemsRoute); // Add Old Items route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
