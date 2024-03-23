import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Config from '../../config/config';
import Navbar from '../../components/Navbar';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import NurseLeftbar from './NurseLeftbar';
import PageBody from '../../components/PageBody';
import Rightbar from '../../components/Rightbar';

function BsTable() {
    const { nic } = useParams();
    const [bloodSugarData, setBloodSugarData] = useState([]);
    const [filterType, setFilterType] = useState('all'); // 'all' by default

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

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    const filteredData = filterType === 'all' ? bloodSugarData : bloodSugarData.filter(entry => entry.type === filterType);

    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <NurseLeftbar />
                <PageBody>
                    <h6>Blood Sugar Data for patient NIC: {nic}</h6>
                    <RadioGroup row aria-label="filter" name="filter" value={filterType} onChange={handleFilterChange}>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="random" control={<Radio />} label="Random" />
                        <FormControlLabel value="fasting" control={<Radio />} label="Fasting" />
                    </RadioGroup>
                    <TableContainer component={Paper} style={{ backgroundColor: '#f3f3f3', marginBottom: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow hover>
                                    <TableCell>Record Date</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Special Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((entry, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>{new Date(entry.Recorddate).toLocaleDateString()}</TableCell>
                                        <TableCell>{entry.type}</TableCell>
                                        <TableCell>{entry.rbs}</TableCell>
                                        <TableCell>{entry.specialNotes}</TableCell>
                                        <TableCell>
                              <Button variant='outlined' style={{ marginRight: '10px' }}>
                                <Link style={{ textDecoration: 'none' }} >Update</Link>
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button variant='outlined' color='error' >
                                Delete
                              </Button>
                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PageBody>
                <Rightbar />
            </Stack>
        </div>
    );
}

export default BsTable;
