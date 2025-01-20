import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;


    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <h1>JK Online Classifieds </h1>
               <p> <img src='https://tse4.mm.bing.net/th?id=OIP.cWhGDCN18lPntwRPEWMYVgHaHW&pid=Api&P=0&h=30' alt= ''/> +91-8825433057</p>
            </div>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>Rental</Link>
                <Link to="/old-items" style={styles.link}>Old Items Sale</Link>
                {decodedToken?.role === "admin" && <Link to="/add-old-item">Add Old Item</Link>}
                {!user ? (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                ) : (
                    <>
                        <span style={{ marginLeft: '10px' }}>Welcome, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '5px 10px',
                                background: 'red',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
 };
    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
        },
        logo: {
            fontSize: '24px',
            fontWeight: 'bold',
        },
        nav: {
            display: 'flex',
            gap: '15px',
        },
        link: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '500',
        },
};

export default Header;
