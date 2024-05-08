import { Box, Badge, Dialog, DialogTitle, DialogContent, Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import axios from 'axios';
import CampaignIcon from '@mui/icons-material/Campaign';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/getAnnouncement')
      .then(response => {
        console.log(response.data); 
        setAnnouncements(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };

  return (
    <div>
      <Box bgcolor="" flex={2} onClick={handleOpenDialog} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h4 onClick={handleOpenDialog} style={{ cursor: 'pointer' }}>
          Announcements
        </h4>
        <Badge badgeContent={announcements.length} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '1rem' } }}>
          <CampaignIcon sx={{ fontSize: '5rem', marginRight: 1 }} />
        </Badge>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>All Announcements</DialogTitle>
        <DialogContent>
          {announcements.map((announcement, index) => (
            <Card key={index} sx={{ marginBottom: 2 ,minWidth:'500px'}}>
              <CardContent>
                <Typography variant="h5" component="div" color={'error'}>
                  {announcement.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {announcement.announcement}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {formatDate(announcement.Date)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Doctor: {announcement.doctor}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Announcements;
