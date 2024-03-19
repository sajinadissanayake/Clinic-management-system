import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    Grid,
    Avatar,
    Stack,
    Card,
    CardContent,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CardActionArea,
    
} from '@mui/material';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import PageBody from '../../components/PageBody';
import PatientReports from '../../components/PatientReports';
import BloodSugarChart from '../../components/BloodSugarChart';
import PRightbar from '../../components/PRightbar';
import { red } from '@mui/material/colors';
import PrescLeftbar from '../../components/PrescLeftbar';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RequestReportsDialog from  '../../components/RequestReportsDialog';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import RequestRecordDialog from '../../components/RequestRecordDialog';
import maleAvatar from '../images/male.png';
import femaleAvatar from '../images/female.png';
function PrescProfile() {
    const [patient, setPatient] = useState(null);
    const [openPersonalDialog, setOpenPersonalDialog] = useState(false);
    const [openHealthDialog, setOpenHealthDialog] = useState(false);
    const [openReportsDialog, setOpenReportsDialog] = useState(false); 
    
    const { id } = useParams();

    useEffect(() => {
        console.log();
        axios.get(`http://localhost:3001/getPatient/${id}`)
        
            .then(response => setPatient(response.data))
            .catch(error => console.error('Error fetching patient:', error));
            console.log();

    }, [id]);

    const handlePersonalDialogOpen = () => {
        setOpenPersonalDialog(true);
    };

    const handlePersonalDialogClose = () => {
        setOpenPersonalDialog(false);
    };

    const handleHealthDialogOpen = () => {
        setOpenHealthDialog(true);
    };

    const handleHealthDialogClose = () => {
        setOpenHealthDialog(false);
    };
    const handleReportsDialogOpen = () => {
        setOpenReportsDialog(true);
    };

    const handleReportsDialogClose = () => {
        setOpenReportsDialog(false);
    };
    const [openSurgicalDialog, setOpenSurgicalDialog] = useState(false);

    // Handlers for surgical dialog...
    const handleSurgicalDialogOpen = () => {
        setOpenSurgicalDialog(true);
    };

    const handleSurgicalDialogClose = () => {
        setOpenSurgicalDialog(false);
    };

    // report request
const [openRequestReportsDialog, setOpenRequestReportsDialog] = useState(false);

const handleRequestReportsDialogOpen = () => {
    setOpenRequestReportsDialog(true);
};

const handleRequestReportsDialogClose = () => {
    setOpenRequestReportsDialog(false);
};
// record
const [openRequestRecordDialog, setOpenRequestRecordDialog] = useState(false);

    const handleRequestRecordDialogOpen = () => {
        setOpenRequestRecordDialog(true);
    };

    const handleRequestRecordDialogClose = () => {
        setOpenRequestRecordDialog(false);
    };
   
    

    if (!patient) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <PrescLeftbar patientNIC={patient.nic} />
                <PageBody>
                    <Container maxWidth="md" sx={{ marginTop: 4 }}>
                        <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar alt={patient.name} src={patient.gender === 'male' ? maleAvatar : femaleAvatar} sx={{ width: 60, height: 60, marginRight: 2 }} />
                                        <div>
                                            <Typography variant="h5">{patient.name}</Typography>
                                            <Typography variant="h6" style={{ color: 'red' }}>Blood Type: {patient.blood}</Typography>
                                        </div>
                                    </Stack>
                                    
                                </Grid>

                            <Grid item xs={6} md={3} >
                            <CardActionArea sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Card onClick={handlePersonalDialogOpen} sx={{ width: '100%', cursor: 'pointer',borderRadius:8 }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="body1">Personal Details</Typography>
                                    <PersonIcon color='primary' sx={{ fontSize: 100 }} />
                                </CardContent>

                                </Card></CardActionArea>
                            </Grid>
                            <Grid item xs={6} md={3}>
                            <CardActionArea > <Card onClick={handleHealthDialogOpen} sx={{ width: '100%', cursor: 'pointer',borderRadius:6 }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="body1">Health Details</Typography>
                                        <LocalHospitalIcon color='primary' sx={{ fontSize: 100 }} />
                                    </CardContent>
                                </Card></CardActionArea>
                            </Grid>


                            <Grid item xs={6} md={3}>
                                <CardActionArea>
                                    <Card onClick={handleSurgicalDialogOpen} sx={{ width: '100%', cursor: 'pointer', borderRadius: 6 }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="body1">Surgical History</Typography>
                                            <MedicalServicesIcon color='primary' sx={{ fontSize: 100 }} />
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>

                            {/* Blood sugar levels and other components... */}

                            {/* Surgical Details Dialog */}
                            <Dialog open={openSurgicalDialog} onClose={handleSurgicalDialogClose}>
                                <DialogTitle>Surgical History</DialogTitle>
                                <DialogContent>
                                    {/* Content for surgical history dialog */}
                                    <Typography variant="body1">{patient.sh}</Typography>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleSurgicalDialogClose}>Close</Button>
                                </DialogActions>
                            </Dialog>

                            <Grid item xs={6} md={3}>
                                <CardActionArea>
                                    <Card onClick={handleReportsDialogOpen} sx={{ width: '100%', cursor: 'pointer',borderRadius:6 }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="body1">Reports</Typography>
                                            <TextSnippetIcon color='primary' sx={{ fontSize: 100 }}/>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <CardActionArea>
                                <Link style={{ textDecoration: 'none' }} to={`/addpresc/${patient._id}`}>
                                    <Card onClick={handleReportsDialogOpen} sx={{ width: '100%', cursor: 'pointer',borderRadius:6 }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="body1">Add Prescription</Typography>
                                            <TextSnippetIcon color='primary' sx={{ fontSize: 100 }}/>
                                        </CardContent>
                                    </Card></Link>
                                </CardActionArea>
                            </Grid>
                            <RequestReportsDialog patientNIC={patient.nic}  open={openRequestReportsDialog} onClose={handleRequestReportsDialogClose} />

                           
                            <Grid item xs={6} md={3}>
                                <CardActionArea>
                                    <Card onClick={handleRequestReportsDialogOpen} sx={{ width: '100%', cursor: 'pointer', borderRadius: 6 }}>
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Typography variant="body1">Request Reports</Typography>
                                            <DriveFileMoveIcon color='primary' sx={{ fontSize: 100 }}/>
                                        </CardContent>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                            <RequestRecordDialog open={openRequestRecordDialog} onClose={handleRequestRecordDialogClose} />
                            
                            <Grid item xs={6} md={3}>
                                <CardActionArea>
                              
                                <Card onClick={handleRequestRecordDialogOpen} sx={{ width: '100%', cursor: 'pointer', borderRadius: 6 }}>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="body1">Request Record</Typography>
                                        <DriveFileMoveIcon color='primary' sx={{ fontSize: 100 }} />
                                    </CardContent>
                                </Card>

                                </CardActionArea>
                            </Grid>
                           
                            <Grid item xs={12}>
                                <Card sx={{ width: '100%',borderRadius:6 }}>
                                    <CardContent>
                                        <Typography variant="h6">Blood Sugar Levels</Typography>
                                        <BloodSugarChart nic={patient.nic} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            
                            {/* Personal Details Dialog */}
                            <Dialog open={openPersonalDialog} onClose={handlePersonalDialogClose}>
                                <DialogTitle>Personal Details</DialogTitle>
                                <DialogContent>
                                <CardContent>
                               
                                <TableContainer component={Paper}>
                                            <Table aria-label="patient details table" size="small">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell colSpan={2} align="center"><Typography variant="h6">Patient Details</Typography></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                <TableRow hover>
                                                    <TableCell><strong>Name:</strong></TableCell>
                                                    <TableCell>{patient.name}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>NIC:</strong></TableCell>
                                                    <TableCell>{patient.nic}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Email:</strong></TableCell>
                                                    <TableCell>{patient.email}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Age at Registration:</strong></TableCell>
                                                    <TableCell>{patient.age}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Date of Birth:</strong></TableCell>
                                                    <TableCell>{new Date(patient.dob).toLocaleDateString()}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Gender:</strong></TableCell>
                                                    <TableCell>{patient.gender}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Address:</strong></TableCell>
                                                    <TableCell>{patient.address}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Marital Status:</strong></TableCell>
                                                    <TableCell>{patient.maritial}</TableCell>
                                                </TableRow>
                                                <TableRow hover>
                                                    <TableCell><strong>Phone Number:</strong></TableCell>
                                                    <TableCell>{patient.pnumber}</TableCell>
                                                </TableRow>
                                                </TableBody>
                                            </Table>
                                            </TableContainer>

                                    </CardContent>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handlePersonalDialogClose}>Close</Button>
                                </DialogActions>
                            </Dialog>

                            {/* Health Details Dialog */}
                            <Dialog open={openHealthDialog} onClose={handleHealthDialogClose}>
                                <DialogTitle>Health Details</DialogTitle>
                                <DialogContent>
                               <Card>
                                <CardContent>
                                <TableContainer component={Paper}>
                                        <Table aria-label="patient details table" size="small">
                                           
                                            <TableBody>
                                           
                                            <TableRow hover>
                                                <TableCell><strong>Physical Condition:</strong></TableCell>
                                                <TableCell>{patient.physical}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Tobacco Use:</strong></TableCell>
                                                <TableCell>{patient.tobacco}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Tobacco Chewing:</strong></TableCell>
                                                <TableCell>{patient.tobaccochew}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Alcohol Consumption:</strong></TableCell>
                                                <TableCell>{patient.alcohol}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Other Drugs:</strong></TableCell>
                                                <TableCell>{patient.other}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Snacks:</strong></TableCell>
                                                <TableCell>{patient.snacks}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Diseases:</strong></TableCell>
                                                <TableCell>{patient.diseases}</TableCell>
                                            </TableRow>
                                            <TableRow hover>
                                                <TableCell><strong>Allergies:</strong></TableCell>
                                                <TableCell>{patient.allergies}</TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                        </TableContainer>
                                </CardContent>
                               </Card>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleHealthDialogClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                            

                    <Dialog open={openReportsDialog} onClose={handleReportsDialogClose}>
                        <DialogTitle>Reports</DialogTitle>
                        <DialogContent>
                        <Grid item xs={12}>
                                
                                <PatientReports patientNIC={patient.nic}/>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleReportsDialogClose}>Close</Button>
                        </DialogActions>
                 </Dialog>



                            
                        </Grid>
                    </Container>
                </PageBody>
                <PRightbar patientNIC={patient.nic} />
            </Stack>
        </div>
    )
}

export default PrescProfile;
