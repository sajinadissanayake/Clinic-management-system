import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { Table, TableHead, TableBody, TableRow, TableCell, Avatar, Card, CardContent, Typography, Container, Select, MenuItem, FormControl, InputLabel, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; // You may need to import the adapter if you're using date-fns for date manipulation
import { useParams } from 'react-router-dom';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import PharmacySidebar from '../../components/PharmacySidebar';
import Layout from '../../components/Layout';

function Pprescriptions() {
    const [patient, setPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date
    const { nic } = useParams();

    useEffect(() => {
        // Fetch patient data
        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
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

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDateTextChange = (event) => {
        const inputDate = new Date(event.target.value);
        if (!isNaN(inputDate.getTime())) { // Check if the entered date is valid
            setSelectedDate(inputDate);
        }
    };

    const filteredPrescriptions = prescriptions.filter(prescription => {
        if (selectedYear && prescription.year !== selectedYear) {
            return false;
        }
        if (selectedMonth && prescription.month !== selectedMonth) {
            return false;
        }
        if (selectedDate && new Date(prescription.PostedDate).toDateString() !== selectedDate.toDateString()) {
            return false;
        }
        return true;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <Navbar pageTitle="Prescriptions" />
            <Layout>
                <Stack direction="row"  justifyContent="space-between">
                    <PharmacySidebar />
                    
                    {patient && (
                        <Container>
                            <Card style={{ borderRadius: 30, marginTop: 20 }}>
                                <CardContent>
                                    <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                                    <Typography variant="h5">{patient.name}</Typography>
                                    <Typography variant="subtitle1">NIC: {patient.nic}</Typography>
                                </CardContent>
                            </Card>
                            <Card style={{marginTop:10}}>   
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
                                        <MenuItem value="2024">2024</MenuItem>
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
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <TextField
                                        id="date"
                                        label="Date"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleDateTextChange}
                                    />
                                </FormControl>
                           
                                <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Prescription</TableCell>
                                                <TableCell>Status</TableCell>
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
                                                    <TableCell>{prescription.status}</TableCell>
                                                    <TableCell>{new Date(prescription.PostedDate).toLocaleDateString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Card>
                        </Container>
                    )}
                </Stack>
            </Layout>
        </div>
    );
}

export default Pprescriptions;
