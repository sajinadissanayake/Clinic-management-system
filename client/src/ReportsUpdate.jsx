import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function ReportsUpdate() {
    const { id } = useParams(); // Get the report ID from the URL params
    const [reportData, setReportData] = useState({});
    const [nic, setNic] = useState(""); // Ensure it's initialized with an empty string
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch report data from the server
        axios.get(`http://localhost:3001/getReports/${id}`)
            .then(response => {
                setReportData(response.data);
                setNic(response.data.nic || ""); // Ensure nic is initialized or set it to an empty string
            })
            .catch(error => {
                console.error('Error fetching report:', error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nic', nic);
        formData.append('patientReport', patientReport);

        axios.put(`http://localhost:3001/updateReport/${id}`, formData)
            .then(result => {
                console.log(result);
                navigate('/ReportsView');
            })
            .catch(err => console.log(err));
    };

    if (!reportData.nic) {
        return <div>Loading...</div>; // Handle case when report data is still being fetched
    }

    return (
        <div>
            <h2>Update Reports</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="">Nic</label>
                    <input type="text" placeholder="Enter Nic" value={nic} onChange={(e) => setNic(e.target.value)}/><br/>
                </div>
             
                <div>
                    <label htmlFor="report">Patient report</label>
                    <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReportsUpdate;
