import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import Homepage from './Pages/Homepage';
import Taskformpg from './Pages/Taskformpg';
import Paymentpage from './Pages/Paymentpage';
import Customerpage from './Pages/Customerpage';
// import Login from './Page/Auth/Login';
import './App.css';


function App() {
  return (
    <Router>
      <Header/>
      <div style={styles.layout}>
        <Dashboard/>
        <div style={styles.content}>
          <Routes>
            <Route path ="/" element={<Homepage/>} />
            <Route path ="/taskform" element={<Taskformpg/>} />
            <Route path ="/payment" element={<Paymentpage/>} />
            <Route path ="/customer" element={<Customerpage/>} />
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
  );
};

const styles = {
  layout: {
    display: "flex",
  },
  content: {
    marginLeft: "250px",
    padding: "20px",
    width: "calc(100%-250%)",
  },
};
export default App;
        
        