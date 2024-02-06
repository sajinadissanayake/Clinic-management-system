import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";

function PatientList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/deleteUser/' + id)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div>
        <Link to="/add">Add +</Link>
        <table>
        <thead>
                    <tr>
                        <th>Name</th>
                       
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                     {
                        users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                           
                            <td>
                                 <Link to={`/patient/${user._id}`} >view</Link>
                                <Link to={`/updatepatient/${user._id}`} >Update</Link>
                                <button onClick={(e) => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientList;
