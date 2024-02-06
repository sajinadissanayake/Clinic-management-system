import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OnePatient() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams(); // Get the ID of the selected patient from URL params

  useEffect(() => {
    // Fetch the patient data by ID
    axios.get(`http://localhost:3001/getPatient/${id}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error('Error fetching patient:', error));
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Profile</h1>
      <div>
        <p>Name: {patient.name}</p>
        <p>Email: {patient.email}</p>
        <p>Age: {patient.age}</p>
        <p>Date of Birth: {patient.dob}</p>
        {/* Add other patient details as needed */}
      </div>
    </div>
  );
}

export default OnePatient;
