import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Stack, TextareaAutosize } from '@mui/material';
import html2pdf from 'html2pdf.js';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import LabSidebar from '../../components/LabSidebar';
import PageBody from '../../components/PageBody';
import Announcements from '../../components/Announcements';

function Reportgen() {
  // State variables to store form data
  const [nic, setNic] = useState('');
  const [name,setName] = useState('');
  const [type, setType] = useState('');
  const [summary, setSummary] = useState('');
  const [testResults, setTestResults] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gather form data
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formData = {
      nic,
      type,
      name,
      summary,
      testResults,
      currentDate 
    };

    // HTML template for the PDF
    const htmlTemplate = `
    <style>
    body {
      font-size: 0.875rem;
      font-family: Arial, sans-serif;
      color: #000;
      margin: 0 auto;
      padding: 10rem;
      padding-left: 20px; /* Adjust the left padding */
      
    }
  
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    h1 {
      font-size: 1.5rem;
      margin: 0;
      color: #333;
    }
  
    h2 {
      font-size: 1.25rem;
      margin: 0.5rem 0;
      color: #555;
    }
  
    p {
      margin: 0.5rem 0;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
    }
  
    .summary {
      margin-top: 2rem;
    }
  
    .signatures {
      margin-top: 2rem;
      text-align: center;
    }
  
    .signature-label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  
    input[type="text"] {
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
      border: 1px solid #ddd;
    }
  </style>
  
    <div>
    <h1 style="text-align: center;">Patient Report</h1>

     


    <div class="header">
  
</div>
<div class="content">
  <div class="info">
    <h2>Patient Information:</h2>
    <p><strong>Patient Name:</strong> ${formData.name}</p>
    <p><strong>Patient Nic:</strong>  ${formData.nic}</p>
    <p><strong>Type of Report:</strong> Type: ${formData.type}</p>
   
    <p><strong>Date of Report: ${formData.currentDate}</p>
  </div>
  <div class="results">
    <h2>Test Results:</h2>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Result</th>
          <th>Reference Range</th>
        </tr>
      </thead>
      <tbody>
      ${formData.testResults.map(result => `
      <tr>
        <td>${result.test}</td>
        <td>${result.result}</td>
        <td>${result.referenceRange}</td>
      </tr>
    `).join('')}
      </tbody>
    </table>
  </div>
  <div class="summary">
    <h2>Summary:</h2>
    <p><strong>Summary of findings:</strong> ${formData.summary}</p>
  </div>
  <div class="signatures">
    <div class="signature">
      <p class="signature-label">Physician:</p>
      <input type="text" placeholder="Physician's Signature" />
    </div>
    <div class="signature">
      <p class="signature-label">Lab Technician:</p>
      <input type="text" placeholder="Lab Technician's Signature" />
    </div>
  </div>
</div>
    `;

    // Generate PDF
    html2pdf().from(htmlTemplate).save('report.pdf');

     // Trigger SweetAlert
     Swal.fire({
      icon: 'success',
      title: 'Report Generated Successfully',
      text: 'Check your downloads folder for the report.',
    });


    // Clear form fields
    setNic('');
    setName('');
    setType('');
    setTestResults([]);
    setSummary('');
    setName('');
  };

  // Function to handle adding a new test result
  const handleAddResult = () => {
    setTestResults([...testResults, { test: '', result: '', referenceRange: '' }]);
  };

  // Function to handle changing test result inputs
  const handleResultChange = (index, key, value) => {
    const updatedResults = [...testResults];
    updatedResults[index][key] = value;
    setTestResults(updatedResults);
  };

  return (
    <div>
      <Navbar pageTitle="Reports" />
      <Layout>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <LabSidebar />
          <PageBody>
            <Container maxWidth="sm">
              <Box>
                <Typography variant="h4" align="center" gutterBottom>
                  Lab Report Generator
                </Typography>
                <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    label="Patient Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    id="nic"
                    label="NIC"
                    variant="outlined"
                    margin="normal"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    id="type"
                    label="Type"
                    variant="outlined"
                    margin="normal"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  {testResults.map((result, index) => (
                    <div key={index}>
                      <TextField
                        fullWidth
                        label="Test"
                        variant="outlined"
                        margin="normal"
                        value={result.test}
                        onChange={(e) => handleResultChange(index, 'test', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Result"
                        variant="outlined"
                        margin="normal"
                        value={result.result}
                        onChange={(e) => handleResultChange(index, 'result', e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="Reference Range"
                        variant="outlined"
                        margin="normal"
                        value={result.referenceRange}
                        onChange={(e) => handleResultChange(index, 'referenceRange', e.target.value)}
                      />
                    </div>
                  ))}
                  <Button onClick={handleAddResult} variant="outlined" color="primary">
                    Add Test Result
                  </Button>
                  <TextareaAutosize
                minRows={10}
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 6 }}
              /><br /><br />
                  



                  <Button type="submit" variant="contained" color="primary">
                    Generate Report
                  </Button>
                </form>
              </Box>
            </Container>
          </PageBody>
          <Announcements />
        </Stack>
      </Layout>
    </div>
  );
}

export default Reportgen;
