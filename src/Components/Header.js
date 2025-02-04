import React from "react";

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}> Bevu Garage Management System</h1>
        </header>
    );
};
const styles = {
    header: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
    },
    title: {
        margin: 0,
        fontSize: "2rem",
    },
};
export default Header;