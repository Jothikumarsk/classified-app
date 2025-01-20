import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Olditems from './components/OldItems'
import Home from './pages/Home';
import AddProperty from './components/AddProperty';
import PropertyDetails from './pages/PropertyDetails';
import AddOldItem from "./components/AddOldItem";
import './App.css'

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/old-items" element={<Olditems />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/add-old-item" element={<AddOldItem />} />
        </Routes>
    </Router>
);

export default App;
