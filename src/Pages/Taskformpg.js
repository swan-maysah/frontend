


import React, { useEffect, useState } from "react";
import axios from "axios";

const Taskformpg = () => {
    const [task_date, setTaskform] = useState("");
    const [formData, setFormData] = useState({
        amount_paid: '',
        description: '',
    });
    const [isEditing, setIsEditing] = useState(true);
    const [isViewing, setIsViewing] = useState(true);  
    const [editTaskformId, setEditTaskformId] = useState(null);
    const [showForm, setShowForm] = useState(true); 

    useEffect(() => {
        const fetchTaskform = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/taskforms");
                setTaskform(response.data);
            } catch (error) {
                console.error("Error fetching taskform:", error);
            }
        };

        fetchTaskform();
    }, []);

    const openTaskformForm = (taskform, mode = 'edit') => {
        if (taskform) {
            setFormData({
                task_date: taskform.task_date,
                description: taskform.description,
            });
            setEditTaskformId(taskform.id);
            if (mode === 'view') {
                setIsViewing(true);  
                setIsEditing(false);
            } else {
                setIsEditing(true);  
                setIsViewing(false);
            }
        } else {
            setFormData({ task_date: '', description: ''});
            setIsEditing(false);
            setIsViewing(false);
        }
        setShowForm(true); 
    };

    const closeTaskformForm = () => {
        setShowForm(false); 
        setFormData({ task_date: '', description: ''});
        setIsEditing(false);
        setIsViewing(false);
        setEditTaskformId(null);
    };

    const deleteTaskform = async (taskformId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this taskform?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/taskforms/${editTaskformId}`);
                setTaskform(taskformId.filter(taskform => taskform.id !== taskformId));
            } catch (error) {
                console.error("Error deleting taskform:", error);
            }
        }
    };

    const handleChange = (e) => {
        const { task_date, value } = e.target;
        setFormData({ ...formData, [task_date]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
            
                await axios.put(`http://127.0.0.1:8000/api/taskforms/${editTaskformId}`, {
                    task_date: formData.task_date,
                    description: formData.description,
                });
                setTaskform((taskforms)=>taskforms.map(taskform => taskform.id === editTaskformId 
                    ? { ...taskform, task_date: formData.task_date, description: formData.description} 
                    : taskform
                ));
            } else {
                
                const response = await axios.post("http://127.0.0.1:8000/api/taskforms/", {
                    task_date: formData.task_date,
                    description: formData.description,
                });
                setTaskform((taskforms)=>[...taskforms, response.data]); 
            }
            closeTaskformForm(); 
        } catch (error) {
            console.error("Error submitting taskform data:", error);
            alert(error.response ? error.response.data : "Error while adding taskform.");
        }
    };

    return (
        <>
            <div className="Taskform">
                <div className="table-actions" style={{ marginBottom: "30px" }}>
                    <button className="view-btn" onClick={() => openTaskformForm()}>View Taskform</button>
                </div>
                <div className="content-container"></div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date for tasks</th>
                                <th>Task Descriptions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(taskforms)=>taskforms.map((taskform) => (
                                <tr key={taskform.id}>
                                    <td>{taskform.task_date}</td>
                                    <td>{taskform.description}</td>
                                    <td>
                                        <button className="view-btn" onClick={() => openTaskformForm(taskform, 'view')}>View</button>
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => openTaskformForm(taskform, 'edit')}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => deleteTaskform(taskform.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>




                <button className="add-btn" onClick={() => openTaskformForm()}>Add Taskform</button>
                <button className="delete-btn" onClick={() => openTaskformForm()}>Delete Taskform</button>
                <div id="taskForm" className={`form-container ${showForm ? 'show' : ''}`}>
                    <h2>{isEditing ? "Edit Taskform" : isViewing ? "View Taskform" :  "Add Taskform"}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="task_date">Date for tasks:</label>
                        <input 
                            type="text" 
                            value={task_date} 
                            onChange={handleChange} 
                            placeholder="Enter Date for tasks you done" 
                            required 
                            readOnly={isViewing} // Make input read-only in view mode
                        />

                        <label htmlFor="method">Payment method:</label>
                        <input 
                            type="text" 
                            value={formData.description} 
                            onChange={handleChange} 
                            placeholder="Enter payment method " 
                            required 
                            readOnly={isViewing} 
                        />

                        <div className="form-actions">
                            <button type="submit" disabled={isViewing}>{isEditing ? "Add Taskform" : isViewing ? "View Taskform" : "Add Taskform"}</button>
                            <button type="submit" disabled={isViewing}>{isEditing ? "delete Taskform" : isViewing ? "Delete Taskform" : "Delete Taskform"}</button>
                            <button type="button" onClick={closeTaskformForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Taskformpg;



