// Import required modules
const express = require('express');
const app = express();

// Middleware to serve static files
app.use(express.static('public'));

// Base route: serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  
  // Check if the parameter is empty
  if (!dateParam) {
    date = new Date(); // Current date
  } else {
    // Check if the parameter is numeric (UNIX timestamp)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam)); // Convert to number and create date
    } else {
      date = new Date(dateParam); // Parse as ISO-8601 date
    }
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen on the provided port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
