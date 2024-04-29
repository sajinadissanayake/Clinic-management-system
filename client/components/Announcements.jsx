import { Box, Icon } from '@mui/material';
import React from 'react';
import AnnouncementIcon from '@mui/icons-material/Announcement';

function Announcements() {
  return (
    <div>
      <Box bgcolor="" flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <h4><Icon sx={{ marginRight: 1 }}><AnnouncementIcon /></Icon>Announcements</h4>
      </Box>
    </div>
  );
}

export default Announcements;
