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
        <p>NIC: {patient.nic}</p>
        <p>Email: {patient.email}</p>
        <p>Age: {patient.age}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Gender: {patient.gender}</p>
        <p>Address: {patient.address}</p>
        <p>Marital Status: {patient.maritial}</p>
        <p>Phone Number: {patient.pnumber}</p>
        <p>MOH: {patient.moh}</p>
        <p>PHM: {patient.phm}</p>
        <p>PHI: {patient.phi}</p>
        <p>GND: {patient.gnd}</p>
        <p>DSD: {patient.dsd}</p>
        <p>Neighbour: {patient.neighbour}</p>
        <p>Education: {patient.education}</p>
        <p>Physical Condition: {patient.physical}</p>
        <p>Tobacco Use: {patient.tobacco}</p>
        <p>Tobacco Chewing: {patient.tobaccochew}</p>
        <p>Alcohol Consumption: {patient.alcohol}</p>
        <p>Other Details: {patient.other}</p>
        <p>Snacks: {patient.snacks}</p>
        <p>Diseases: {patient.diseases}</p>
        <p>Allergies: {patient.allergies}</p>
        <p>Registration Date: {patient.registrationDate}</p>
      </div>
    </div>
  );
}

export default OnePatient;
