import React, { useEffect, useState } from "react";
import axios from "axios";

const Customerpage = () => {
    const [name, setCustomer] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
    });
    const [isEditing, setIsEditing] = useState(true);
    const [isViewing, setIsViewing] = useState(true); 
    const [editCustomerId, setEditCustomerId] = useState(null);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/customers/");
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        fetchCustomer();
    }, []);

    const openCustomerForm = (customer, mode = 'edit') => {
        if (customer) {
            setFormData({
                name: customer.name,
                phone_number: customer.phone_number,
            });
            setEditCustomerId(customer.id);
            if (mode === 'view') {
                setIsViewing(true);  
                setIsEditing(false);
            } else {
                setIsEditing(true);  
                setIsViewing(false);
            }
        } else {
            setFormData({ name: '', phone_number: ''});
            setIsEditing(false);
            setIsViewing(false);
        }
        setShowForm(true);
    };

    const closeCustomerForm = () => {
        setShowForm(false); 
        setFormData({ name: '', phone_number: ''});
        setIsEditing(false);
        setIsViewing(false);
        setEditCustomerId(null);
    };

    const deleteCustomer = async (customerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/customers/${editCustomerId}`);
                setCustomer(customerId.filter(customer => customer.id !== customerId));
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
        
                await axios.put(`http://127.0.0.1:8000/api/customers/${editCustomerId}`, {
                    name: formData.name,
                    phone_number: formData.phone_number,
                });
                setCustomer((customers)=>customers.map(customer => customer.id === editCustomerId 
                    ? { ...customer, name: formData.name, phone_number: formData.phone_number} 
                    : customer
                ));
            } else {
            
                const response = await axios.post("http://127.0.0.1:8000/api/customers/", {
                    name: formData.name,
                    phone_number: formData.phone_number,
                });
                setCustomer((customers)=>[...customers, response.data]); 
            }
            closeCustomerForm(); 
        } catch (error) {
            console.error("Error submitting customer data:", error);
            alert(error.response ? error.response.data : "Error while adding customer.");
        }
    };

    return (
        <>
            <div className="Customer">
                <div className="table-actions" style={{ marginBottom: "30px" }}>
                    <button className="view-btn" onClick={() => openCustomerForm()}>View Customer</button>
                </div>
                <div className="content-container"></div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone_number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(customers)=>customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone_number}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => openCustomerForm(customer, 'view')}>View</button>
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => openCustomerForm(customer, 'edit')}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => deleteCustomer(customer.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <button className="add-btn" onClick={() => openCustomerForm()}>Add Customer</button>
                <button className="delete-btn" onClick={() => openCustomerForm()}>Delete Customer</button>
                <div id="customer" className={`form-container ${showForm ? 'show' : ''}`}>
                    <h2>{isEditing ? "Edit Customer" : isViewing ? "View Customer" :  "Edit Customer"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task_date">Name of customer:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={handleChange} 
                            placeholder="Enter your name" 
                            required 
                            readOnly={isViewing} 
                        />

                        <label htmlFor="phone_number">Phone number:</label>
                        <input 
                            type="text" 
                            value={formData.phone_number} 
                            onChange={handleChange} 
                            placeholder="Enter your phone number " 
                            required 
                            readOnly={isViewing} 
                        />

                        <div className="form-actions">
                            <button type="submit" disabled={isViewing}>{isEditing ? "Add Customer" : isViewing ? "Edit Customers" : "Add Customer"}</button>
                            <button type="submit" disabled={isViewing}>{isEditing ? "delete Customer" : isViewing ? "Delete Customers" : "Delete Customer"}</button>
                            <button type="button" onClick={closeCustomerForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Customerpage;