import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddPatient() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [dob, setdob] = useState()
    const [gender, setGender] = useState("male"); // Assuming the default value is male
    const [nic, setNic] = useState()
    
    const [address, setaddress] = useState()
    const [maritial, setMaritial] = useState("married");
    const [pnumber, setpnumber] = useState()
    const [moh, setmoh] = useState()

    const [phm, setphm] = useState()
    const [phi, setphi] = useState()
    const [gnd, setgnd] = useState()
    const [dsd, setdsd] = useState()
    const [neighbour, setneighbour] = useState()
    const [education, setEducation] = useState("alevel") 

    // characteristics..............................

    const [physical, setPhysical] = useState("moderate_intensity")
    const [tobacco, setTobacco] = useState("nonuser") 
    const [tobaccochew, setTobaccochew] = useState("nonuser") 
    const [alcohol, setAlcohol] = useState("nonuser") 
    const [other, setOther] = useState("nonuser") 
    const [snacks, setSnacks] = useState("normaluser") 
    const [diseases, setDiseases] = useState() 
    const [allergies, setAllergies] = useState() 



   




    const navigate = useNavigate()

   const Submit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/AddPatient", { name, nic,email, age, dob, gender, address, maritial, pnumber, moh,
                        phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol,other,snacks,diseases,allergies })

    .then(Response => {
        console.log(Response);
        navigate('/');
    })
    .catch(err => console.log(err));

   }

  return (
    <div>
        <div>
            <form onSubmit={Submit}>
                <h2>Add User</h2>
               
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" name="name" onChange={(e) => setName(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">nic</label>
                    <input type="text" placeholder="Enter " name="nic" onChange={(e) => setNic(e.target.value)}/><br/>
                </div>
                
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter Email" name="email"
                    onChange={(e) => setEmail(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">Age</label>
                    <input type="text" placeholder="Enter Age" name="age"
                    onChange={(e) => setAge(e.target.value)}/><br/>
                </div>
 <div>
                 <label htmlFor="">DOB</label>

                <input
                    type="date"
                    placeholder="Enter dob"
                    value={dob ? dob.split('T')[0] : ''}  // Extracting the date part
                    onChange={(e) => setdob(e.target.value)}
                />


                </div>

            <div>
                <label htmlFor="">Gender</label>
                <div>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                    />
                    <label htmlFor="male">Male</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                    />
                    <label htmlFor="female">Female</label>
                </div>
            </div>

                <div>
                    <label htmlFor="">Address</label>
                    <input type="text"  name="address"
                    onChange={(e) => setaddress(e.target.value)}/><br/>
                </div>

                <div>
                <label htmlFor="">Maritial status</label>
                <div>
                    <input
                        type="radio"
                        id="married"
                        name="maritial"
                        value="married"
                        checked={maritial === "married"}
                        onChange={() => setMaritial("married")}
                    />
                    <label htmlFor="married">married</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="unmarried"
                        name="maritial"
                        value="unmarried"
                        checked={maritial === "unmarried"}
                        onChange={() => setMaritial("unmarried")}
                    />
                    <label htmlFor="unmarried">unmarried</label>
                </div>
            </div>

                <div>
                    <label htmlFor="">Contact Number</label>
                    <input type="text"  name="pnumber"
                    onChange={(e) => setpnumber(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">MOH area</label>
                    <input type="text"  name="moh"
                    onChange={(e) => setmoh(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">PHM area</label>
                    <input type="text"  name="phm"
                    onChange={(e) => setphm(e.target.value)}/><br/>
                </div>

                <div>
                    <label htmlFor="">PHI area</label>
                    <input type="text"  name="phi"
                    onChange={(e) => setphi(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">Grama Niladhari Division</label>
                    <input type="text"  name="gnd"
                    onChange={(e) => setgnd(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">Divisiona secratariat division</label>
                    <input type="text"  name="dsd"
                    onChange={(e) => setdsd(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="">Whom to infrom during an emergency </label>
                    <input type="text"  name="neighbour"
                    onChange={(e) => setneighbour(e.target.value)}/><br/>
                </div>

            <div>
                <label htmlFor="">Education</label>
                <div>
                    <input
                        type="radio"
                        id="primary"
                        name="education"
                        value="primary"
                        checked={education === "primary"}
                        onChange={() => setEducation("primary")}
                    />
                    <label htmlFor="">primary</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="secondary"
                        name="education"
                        value="secondary"
                        checked={education === "secondary"}
                        onChange={() => setEducation("secondary")}
                    />
                    <label htmlFor="">secondary</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="olevel"
                        name="education"
                        value="olevel"
                        checked={education === "olevel"}
                        onChange={() => setEducation("olevel")}
                    />
                    <label htmlFor="">olevel</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="alevel"
                        name="education"
                        value="alevel"
                        checked={education === "alevel"}
                        onChange={() => setEducation("alevel")}
                    />
                    <label htmlFor="">alevel</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="degree"
                        name="education"
                        value="degree"
                        checked={education === "degree"}
                        onChange={() => setEducation("degree")}
                    />
                    <label htmlFor="">degree</label>
                </div>
            </div>


                {/* ....characteristics ........................................................*/}

                <h2>characteristics of the patient</h2>
                <h2>..............................</h2>

                
            <div>
                <h3>Phisical activity</h3>
                <div>
                    <input
                        type="radio"
                        id="vigorous_intensity"
                        name="physical"
                        value="vigorous_intensity"
                        checked={physical === "vigorous_intensity"}
                        onChange={() => setPhysical("vigorous_intensity")}
                    />
                    <label htmlFor="">vigorous_intensity</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="moderate_intensity"
                        name="physical"
                        value="moderate_intensity"
                        checked={physical === "moderate_intensity"}
                        onChange={() => setPhysical("moderate_intensity")}
                    />
                    <label htmlFor="">moderate_intensity</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="sendantary"
                        name="physical"
                        value="sendantary"
                        checked={physical === "sendantary"}
                        onChange={() => setPhysical("sendantary")}
                    />
                    <label htmlFor="">sendantary</label>
                </div>
               
            </div>

            <h2>..............................</h2>

            <div>
                <h3>Tobacco smoking</h3>
                <div>
                    <input
                        type="radio"
                        id="user"
                        name="tobacco"
                        value="user"
                        checked={tobacco === "user"}
                        onChange={() => setTobacco("user")}
                    />
                    <label htmlFor="">user</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nonuser"
                        name="tobacco"
                        value="nonuser"
                        checked={tobacco === "nonuser"}
                        onChange={() => setTobacco("nonuser")}
                    />
                    <label htmlFor="">nonuser</label>
                </div>
            </div>


            <h2>..............................</h2>

            <div>
                <h3>Tobacco chewing</h3>
                <div>
                    <input
                        type="radio"
                        id="user"
                        name="tobaccochew"
                        value="user"
                        checked={tobaccochew === "user"}
                        onChange={() => setTobaccochew("user")}
                    />
                    <label htmlFor="">user</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nonuser"
                        name="tobaccochew"
                        value="nonuser"
                        checked={tobaccochew === "nonuser"}
                        onChange={() => setTobaccochew("nonuser")}
                    />
                    <label htmlFor="">nonuser</label>
                </div>
            </div>

            <h2>..............................</h2>
            <div>
                <h3>Alcohol</h3>
                <div>
                    <input
                        type="radio"
                        id="user"
                        name="alcohol"
                        value="user"
                        checked={alcohol === "user"}
                        onChange={() => setAlcohol("user")}
                    />
                    <label htmlFor="">user</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nonuser"
                        name="alcohol"
                        value="nonuser"
                        checked={alcohol === "nonuser"}
                        onChange={() => setAlcohol("nonuser")}
                    />
                    <label htmlFor="">nonuser</label>
                </div>
            </div>


            <h2>..............................</h2>
            <div>
                <h3>other drugs</h3>
                <div>
                    <input
                        type="radio"
                        id="user"
                        name="other"
                        value="user"
                        checked={other === "user"}
                        onChange={() => setOther("user")}
                    />
                    <label htmlFor="">user</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nonuser"
                        name="other"
                        value="nonuser"
                        checked={other === "nonuser"}
                        onChange={() => setOther("nonuser")}
                    />
                    <label htmlFor="">nonuser</label>
                </div>
            </div>


            
            <h2>..............................</h2>
            <div>
                <h3>Snacks</h3>
                <div>
                    <input
                        type="radio"
                        id="normaluser"
                        name="snacks"
                        value="normaluser"
                        checked={snacks=== "normaluser"}
                        onChange={() => setSnacks("normaluser")}
                    />
                    <label htmlFor="">normaluser</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="nonuser"
                        name="snacks"
                        value="nonuser"
                        checked={snacks === "nonuser"}
                        onChange={() => setSnacks("nonuser")}
                    />
                    <label htmlFor="">nonuser</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="heavyuser"
                        name="snacks"
                        value="heavyuser"
                        checked={snacks === "heavyuser"}
                        onChange={() => setSnacks("heavyuser")}
                    />
                    <label htmlFor="">heavyuser</label>
                </div>
            </div>
            <h2>..............................</h2>

            <div>
                    <label htmlFor=""> Diseases(other special diseases)</label>
                    <input type="text"  name="diseases" 
                    onChange={(e) => setDiseases(e.target.value)}/><br/>
            </div>

            <h2>..............................</h2>

            <div>
                    <label htmlFor=""> allergies</label>
                    <input type="text"  name="allergies"
                    onChange={(e) => setAllergies(e.target.value)}/><br/>
            </div>












                <button type="submit">Submit</button>
            </form>
        </div>

    </div>
  )
}

export default AddPatient;