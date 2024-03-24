import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Avatar, Card, CardContent, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';

function Pprescriptions() {
    const [patient, setPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const { nic } = useParams();

    useEffect(() => {
        // Fetch patient data
        axios.get(`http://localhost:3001/getPatient/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
        
        // Fetch prescriptions data
        axios.get(`http://localhost:3001/getPrescriptions/${nic}`)
            .then(response => {
                setPrescriptions(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [nic]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const filteredPrescriptions = prescriptions.filter(prescription => {
        if (selectedYear && prescription.year !== selectedYear) {
            return false;
        }
        if (selectedMonth && prescription.month !== selectedMonth) {
            return false;
        }
        return true;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <Navbar />
            {patient && (
                <Container>
                    <Card>
                        <CardContent>
                            <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                            <Typography variant="h5">{patient.name}</Typography>
                            <Typography variant="subtitle1">NIC: {patient.nic}</Typography>
                        </CardContent>
                    </Card>
                </Container>
            )}
            <Container>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                        labelId="year-label"
                        id="year-select"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="2022">2022</MenuItem>
                        <MenuItem value="2023">2023</MenuItem>
                        {/* Add more years as needed */}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="month-label">Month</InputLabel>
                    <Select
                        labelId="month-label"
                        id="month-select"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="January">January</MenuItem>
                        <MenuItem value="February">February</MenuItem>
                        {/* Add more months as needed */}
                    </Select>
                </FormControl>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Prescription</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPrescriptions.map(prescription => (
                            <TableRow key={prescription._id}>
                                <TableCell>
                                    {prescription.prescription.split('\n').map((line, index) => (
                                        <Typography key={index}>{line}</Typography>
                                    ))}
                                </TableCell>
                                <TableCell>{new Date(prescription.PostedDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </div>
    );
}

export default Pprescriptions;
