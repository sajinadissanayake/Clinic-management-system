
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 function AddReports() {

    const [nic, setNic] = useState();
    const [patientReport, setPatientReport] = useState(null); // New state for patient image
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nic', nic);
       
        formData.append('patientReport', patientReport); // Append the patient image file
        

       

        axios.post('http://localhost:3001/AddReports', formData)
            .then(result => {
                console.log(result);
                navigate('/ReportsView');
            })
            .catch(err => console.log(err));
    };



  return (
    <div>

<div>
            <form onSubmit={Submit} encType="multipart/form-data">
                <h2> Add Reports</h2>
                <div>
                    <label htmlFor="">Nic</label>
                    <input type="text" placeholder="Enter Nic" name="nic" onChange={(e) => setNic(e.target.value)}/><br/>
                </div>
             
                <div>
                        <label htmlFor="report">Patient report</label>
                        <input type="file" name="patientReport" onChange={(e) => setPatientReport(e.target.files[0])} />
                    </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      
    </div>
  )
}

export default AddReports;
