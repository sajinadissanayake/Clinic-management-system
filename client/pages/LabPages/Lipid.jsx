import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Stack, Card, CardContent, Avatar, Typography, Toolbar, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import LabSidebar from '../../components/LabSidebar';
import PageBody from '../../components/PageBody';
import MedicalMenu from '../NursePages/MedicalMenu';
import Layout from '../../components/Layout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
import LipidAddDialog from './LipidAdd'; // Import the dialog component

function Lipid() {
    const { nic } = useParams();
    const [lpData, setLpData] = useState(null);
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog open/close

    useEffect(() => {
        axios.get(`http://localhost:3001/getLp/${nic}`)
            .then(response => {
                setLpData(response.data);
            })
            .catch(error => {
                console.error('Error fetching LP data:', error);
            });

        axios.get(`http://localhost:3001/getPatient/nic/${nic}`)
            .then(response => {
                setPatient(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [nic]);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Function to handle closing the dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Navbar pageTitle="Lipid Profile" />
            <Layout>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <LabSidebar />
                    <PageBody>
                        <h2>Lipid Profile Data</h2>

                        <Card sx={{ borderRadius: 5, backgroundColor: 'background.bg1' }}>
                            <CardContent>
                                <Avatar alt={patient ? patient.name : ''} src={patient && patient.gender === 'male' ? maleAvatar : femaleAvatar} />
                                <Typography variant="h6">{patient ? patient.name : 'Loading...'}: {nic}</Typography>
                            </CardContent>
                        </Card>
                        <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                        <IconButton onClick={handleOpenDialog}> {/* Pass handleOpenDialog as onClick handler */}
                            <AddCircleIcon />
                        </IconButton>
                        </Toolbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>LDL</TableCell>
                                    <TableCell>HDL</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>TCD</TableCell>
                                    <TableCell>Record Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lpData && lpData.map(lp => (
                                    <TableRow key={lp._id}>
                                        <TableCell>{lp.ldl}</TableCell>
                                        <TableCell>{lp.hdl}</TableCell>
                                        <TableCell>{lp.total}</TableCell>
                                        <TableCell>{lp.tcd}</TableCell>
                                        <TableCell>{new Date(lp.Recorddate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PageBody>
                    <MedicalMenu />
                </Stack>
            </Layout>
           
           


           
                    
                    
            <LipidAddDialog open={openDialog} handleCloseDialog={handleCloseDialog} />

 
                
        </div>
    );
}

export default Lipid;
