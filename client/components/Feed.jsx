import React from 'react';




const Feed = (props) => {
  return (
    <div>
      <Box bgcolor="#E5F1F9" flex={4} p={2} borderRadius={5} marginTop={3}>
       
       {props.children}
      </Box>
    </div>
  );
};

export default Feed;
