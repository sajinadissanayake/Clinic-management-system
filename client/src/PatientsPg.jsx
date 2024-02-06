import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PatientsPg() {
    const [users, setUsers] = useState([])
    
    useEffect (()=> {
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => {console.log(res)
       window.location.reload()})
        .catch(err => console.log(err))
    }

  return (
    <div>
        <div>
            <Link to="/add">Add +</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>DOB</th>
                        <th>gender</th>
                        <th>Address</th>
                        <th>Maritial</th>
                        <th>Phone number</th>
                        <th>MOH</th>
                        <th>PHM</th>
                        <th>PHI</th>
                        <th>GND</th>
                        <th>DSD</th> 
                        <th>Neighbour</th>
                        <th>Education up to</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                     {
                        users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.dob}</td>     
                            <td>{user.gender}</td>

                            <td>{user.address}</td>
                            <td>{user.maritial}</td>
                            <td>{user.pnumber}</td>
                            <td>{user.moh}</td>
                            <td>{user.phm}</td>
                            <td>{user.phi}</td>
                            <td>{user.gnd}</td>
                            <td>{user.dsd}</td>
                            <td>{user.neighbour}</td>
                            <td>{user.education}</td>

                            <td>
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
  )
}

export default PatientsPg;