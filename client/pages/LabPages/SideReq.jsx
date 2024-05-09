import React, { useState, useEffect } from 'react';
import { Box, Badge } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SideReq({ nic }) {
    const [pendingReportRequests, setPendingReportRequests] = useState([]);

    useEffect(() => {
        const fetchPendingReportRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getReportRequests/${nic}`);
                const pendingRequests = response.data.filter(request => request.status === "pending");
                setPendingReportRequests(pendingRequests);
            } catch (error) {
                console.error('Error fetching pending report requests:', error);
            }
        };

        fetchPendingReportRequests();
    }, [nic]);

    return (
        <div>
            <Link style={{ textDecoration: 'none' }} to={`/LabRequestsPage/${nic}`}>
            <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
                <h4 style={{ cursor: 'pointer' }}>Requests</h4>
                <Badge color="secondary" badgeContent={pendingReportRequests.length} sx={{ '& .MuiBadge-badge': { fontSize: '1rem' } }}>
                    <TextSnippetIcon color="primary" sx={{ fontSize: '5rem', marginRight: 1 }} />
                </Badge>
            </Box></Link>
        </div>
    );
}

export default SideReq;
