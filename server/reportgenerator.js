const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-pdf', (req, res) => {
  const { nic, type, content } = req.body;

  // Write form data to a temporary JSON file
  const formData = {
    nic,
    type,
    content
  };
  fs.writeFileSync('formData.json', JSON.stringify(formData));

  // Execute the report generator script
  const reportGenerator = spawn('node', ['reportsgenerator.js']);

  reportGenerator.on('close', (code) => {
    console.log(`Report generator process exited with code ${code}`);
    // Send response to client indicating success or failure
    if (code === 0) {
      res.send({ success: true });
    } else {
      res.status(500).send({ success: false });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
