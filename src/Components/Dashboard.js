import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
        <h2 style={styles.title}>App Navigation</h2>
        <ul style={styles.navlist}>
            <li>
                <Link to="/" style={styles.link}>Home</Link>
            </li>

            <li>
                <Link to='/customer'>Manage Customers</Link>
            </li>

            <li>
                <Link to='/taskform'>Manage Tasksforms</Link>
            </li>

            <li>
                <Link to='/payment'>Manage Payments</Link>
            </li>

        </ul>
    </div>
  );
};
const styles = {
    dashboard: {
        width: "150px",
        backgroundColor: "#f4f4f9",
        padding: "20px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
    },
    title: {
        fontSize: "1rem",
        marginBottom: "20px",
    },
    navlist: {
        listStyleType: "none",
        padding: 0,
    },
    link: {
        textDecoration: "none",
        color: "#4CAF50",
        fontSize: "1.2rem",
        display: "block",
        padding: "10px 0",
        transition: "color 0.3s",
    },
    linkHover: {
        color: "#388E3C",
    },
};
export default Dashboard;



