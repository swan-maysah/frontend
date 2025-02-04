import React, { useEffect, useState } from "react";
import axios from "axios";

const Paymentpage = () => {
    const [amount_paid, setPayment] = useState("");
    const [formData, setFormData] = useState({
        amount_paid: '',
        payment_method: '',
    });
    const [isEditing, setIsEditing] = useState(true);
    const [isViewing, setIsViewing] = useState(true);  
    const [editPaymentId, setEditPaymentId] = useState(null);
    const [showForm, setShowForm] = useState(true); 

    useEffect(() => {
        const fetchpayments = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/payments");
                setPayment(response.data);
            } catch (error) {
                console.error("Error fetching Payment:", error);
            }
        };

        fetchpayments();
    }, []);

    const openPaymentForm = (payments, mode = 'edit') => {
        if (payments) {
            setFormData({
                amount_paid: payments.amount,
                payment_method: payments.payment_method,
            });
            setEditPaymentId(payments.id);
            if (mode === 'view') {
                setIsViewing(true);  
                setIsEditing(false);
            } else {
                setIsEditing(true); 
                setIsViewing(false);
            }
        } else {
            setFormData({ amount_paid: '', payment_method: ''});
            setIsEditing(false);
            setIsViewing(false);
        }
        setShowForm(true); 
    };

    const closePaymentForm = () => {
        setShowForm(false); 
        setFormData({ amount_paid: '', payment_method: ''});
        setIsEditing(false);
        setIsViewing(false);
        setEditPaymentId(null);
    };

    const deletePayment = async (paymentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this payment?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/payments/${paymentId}`);
                setPayment(paymentId.filter(payment => payment.id !== paymentId));
            } catch (error) {
                console.error("Error deleting payment:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { amount_paid, value } = e.target;
        setFormData({ ...formData, [amount_paid]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
             
                await axios.put(`http://127.0.0.1:8000/api/payments/${editPaymentId}`, {
                    amount_paid: formData.amount_paid,
                    payment_method: formData.payment_method,
                });
                setPayment((payments)=>payments.map(payment => payment.id === editPaymentId 
                    ? { ...payment, amount_paid: formData.amount_paid, payment_method: formData.payment_method} 
                    : payment
                ));
            } else {
                
                const response = await axios.post("http://127.0.0.1:8000/api/payments/", {
                    amount_paid: formData.amount_paid,
                    payment_method: formData.payment_method,
                });
                setPayment((payments)=>[...payments, response.data]); 
            }
            closePaymentForm();
        } catch (error) {
            console.error("Error submitting payment data:", error);
            alert(error.response ? error.response.data : "Error while adding payment.");
        }
    };

    return (
        <>
            <div className="Payment">
                <div className="table-actions" style={{ marginBottom: "30px" }}>
                    <button className="view-btn" onClick={() => openPaymentForm()}>View Payment</button>
                </div>
                <div className="content-container"></div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(payments)=>payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.amount_paid}</td>
                                    <td>{payment.payment_method}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => openPaymentForm(payment, 'view')}>View</button>
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => openPaymentForm(payment, 'edit')}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => deletePayment(payment.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <button className="add-btn" onClick={() => openPaymentForm()}>Add Payment</button>
                <button className="delete-btn" onClick={() => openPaymentForm()}>Delete Payment</button>
                <div id="paymentForm" className={`form-container ${showForm ? 'show' : ''}`}>
                    <h2>{isEditing ? "Edit Payment" : isViewing ? "View Payment" :  "Add Payment"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="amount">Amount paid:</label>
                        <input 
                            type="text" 
                            value={amount_paid} 
                            onChange={handleChange} 
                            placeholder="Enter amount paid" 
                            required 
                            readOnly={isViewing} 
                        />

                        <label htmlFor="method">Payment method:</label>
                        <input 
                            type="text" 
                            value={formData.payment_method} 
                            onChange={handleChange} 
                            placeholder="Enter payment method " 
                            required 
                            readOnly={isViewing} 
                        />

                        <div className="form-actions">
                            <button type="submit" disabled={isViewing}>{isEditing ? "Add Payment" : isViewing ? "View Payment" : "Add Payment"}</button>
                            <button type="submit" disabled={isViewing}>{isEditing ? "delete Payment" : isViewing ? "Delete Payment" : "Delete Payment"}</button>
                            <button type="button" onClick={closePaymentForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Paymentpage;