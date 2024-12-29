const express = require('express');
const app = express();

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Check if the dateParam is empty
  if (!dateParam) {
    date = new Date(); // Current date
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam)); // UNIX timestamp
  } else {
    date = new Date(dateParam); // ISO-8601 string
  }

  // Check for invalid date
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
