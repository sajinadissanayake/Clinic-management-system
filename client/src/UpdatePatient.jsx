import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

//update dob is not working
function UpdatePatient() {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const [dob, setdob] = useState('');
    const [gender, setGender] = useState('');
    const [nic, setNic] = useState()

    const [address, setAddress] = useState('');
    const [maritial, setMaritial] = useState('');
    const [pnumber, setPnumber] = useState('');

    const [moh, setMoh] = useState('');
    const [phm, setPhm] = useState('');
    const [phi, setPhi] = useState('');
    const [gnd, setGnd] = useState('');

    const [dsd, setDsd] = useState('');
    const [neighbour, setNeighbour] = useState('');
    const [education, setEducation] = useState('');
    
    // characteristics..............................

    const [physical, setPhysical] = useState('')
    const [tobacco, setTobacco] = useState('') 
    const [tobaccochew, setTobaccochew] = useState('') 
    const [alcohol, setAlcohol] = useState('') 
    const [other, setOther] = useState('') 
    const [snacks, setSnacks] = useState('') 
    const [diseases, setDiseases] = useState('') 
    const [allergies, setAllergies] = useState('') 




    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getPatient/' + id)
            .then(result => {
                console.log(result);
                setName(result.data.name);
                setEmail(result.data.email);
                setAge(result.data.age);
                setdob(result.data.dob);
                setGender(result.data.gender);
                setNic(result.data.nic);
                
                setAddress(result.data.address);
                setMaritial(result.data.maritial);
                setPnumber(result.data.pnumber); 
                setMoh(result.data.moh);
                setPhm(result.data.phm);
                setPhi(result.data.phi);
                setGnd(result.data.gnd);
                setDsd(result.data.dsd);
                setNeighbour(result.data.neighbour);
                setEducation(result.data.education);

                //charatcteristics 
                setPhysical(result.data.physical);
                setTobacco(result.data.tobacco);
                setTobaccochew(result.data.tobaccochew);
                setAlcohol(result.data.alcohol);
                setOther(result.data.other);
                setSnacks(result.data.snacks);
                setDiseases(result.data.diseases);
                setAllergies(result.data.allergies);


              
                
            })
            .catch(err => console.log(err));
    }, []);

    const patientUpdate = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/UpdatePatient/" + id, {name, nic,email, age, dob, gender, address, maritial, pnumber, moh,
        phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol,other,snacks,diseases,allergies})
            .then(result => {
                console.log(result);
                navigate('/plist');
            })
            .catch(err => console.log(err));
    };
    

    return (
        <div>
            <form onSubmit={patientUpdate}>
                <h2>Update User</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                </div>
                <div>
                    <label htmlFor="">nic</label>
                    <input type="text" placeholder="Enter "value={nic} onChange={(e) => setNic(e.target.value)}/><br/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="text" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} /><br />
                </div>
                <div>
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
                    <label htmlFor="address">address</label>
                   
                    <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)}/><br/>
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
                    <div>
                    <label htmlFor="pnumber">pnumber</label>
                   
                    <input type="text" name="pnumber" value={pnumber} onChange={(e) => setPnumber(e.target.value)}/><br/>
                </div>
                </div>
                
                    <div>
                    <label htmlFor="moh">MOH</label>
                   
                    <input type="text" name="moh" value={moh} onChange={(e) => setMoh(e.target.value)}/><br/>
                    </div>
                    <div>
                        <label htmlFor="phm">PHM</label>
                   
                        <input type="text" name="phm" value={phm} onChange={(e) => setPhm(e.target.value)}/><br/>
                    </div>
                    <div>
                        <label htmlFor="phi">PHI</label>
                   
                        <input type="text" name="phi" value={phi} onChange={(e) => setPhi(e.target.value)}/><br/>
                    </div>

                    <div>
                        <label htmlFor="gnd">GND</label>
                   
                        <input type="text" name="gnd" value={gnd} onChange={(e) => setGnd(e.target.value)}/><br/>
                    </div>
                    <div>
                        <label htmlFor="dsd">DSD</label>
                   
                        <input type="text" name="dsd" value={dsd} onChange={(e) => setDsd(e.target.value)}/><br/>
                    </div>
                    <div>
                        <label htmlFor="dsd">Neighbour</label>
                   
                        <input type="text" name="neighbour" value={neighbour} onChange={(e) => setNeighbour(e.target.value)}/><br/>
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
                    <input type="text"  name="diseases" value={diseases}
                    onChange={(e) => setDiseases(e.target.value)}/><br/>
            </div>

            <h2>..............................</h2>

            <div>
                    <label htmlFor=""> allergies</label>
                    <input type="text"  name="allergies" value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}/><br/>
            </div>







                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdatePatient;
