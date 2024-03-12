import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Config from '../../config/config';


function BsTable() {
    const { nic } = useParams();
    const [bloodSugarData, setBloodSugarData] = useState([]);
    
    useEffect(() => {
        // Fetch blood sugar data based on NIC
        axios.get(`${Config().getBaseServerUrl}/getBloodSugarData/${nic}`)
            .then(response => {
                setBloodSugarData(response.data);
            })
            .catch(error => {
                console.error('Error fetching blood sugar data:', error);
            });
    }, [nic]);
    return (
        <div>
            <h1>Blood Sugar Data for NIC: {nic}</h1>
            {Array.isArray(bloodSugarData) && bloodSugarData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>RBS</th>
                            <th>Type</th>
                            <th>Record Date</th>
                            <th>Special Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodSugarData.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.rbs}</td>
                                <td>{entry.type}</td>
                                <td>{new Date(entry.Recorddate).toLocaleDateString()}</td>
                                <td>{entry.specialNotes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No blood sugar data available for this NIC.</p>
            )}
        </div>
    );
}

export default BsTable;
