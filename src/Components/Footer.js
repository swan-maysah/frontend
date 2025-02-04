import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; 2025 Bevu Garage Management System. All rights reserved.</p>
        </footer>
    );
};
const styles = {
    footer: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
    },
};   
export default Footer;