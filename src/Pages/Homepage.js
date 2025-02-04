import React from 'react';
// import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div style={styles.home}>
        <h1 style={styles.title}>Hellow! It is Mygarage Management System. You are Welcome!</h1>
        <p> Select from App navigation to continue:</p>
        <ul style={styles.dashboard}>
        </ul>
    </div>
  );
};
const styles = {
    home: {
        text_Align: "center",
        background_color: "#4CAF50",
        padding: "50px",
        height: "100vh",
    },
};    
export default Homepage;