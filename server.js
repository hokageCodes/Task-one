const express = require('express');
const app = express();

// Define a route that handles GET requests to /api
app.get('/api', (req, res) => {
  try {
    // Get query parameters
    const slack_name = req.query.slack_name || 'example_name';
    const track = req.query.track || 'backend';

    // Get current day of the week
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDay = currentDate.toLocaleDateString('en-US', options);

    // Get current UTC time with validation of +/-2 minutes
    const now = new Date();
    const utcOffset = now.getTimezoneOffset();
    const adjustedTime = new Date(now.getTime() + (utcOffset + 2) * 60000);
    const utc_time = adjustedTime.toISOString();

    // GitHub URLs based on query parameters
    const github_file_url = `https://github.com/hokageCodes/HNX-Backend/blob/main/${track}/server.js`;
    const github_repo_url = `https://github.com/hokageCodes/HNX-Backend/tree/main/${track}`;

    // Prepare the response object
    const response = {
      slack_name: slack_name,
      current_day: currentDay,
      utc_time: utc_time,
      track: track,
      github_file_url: github_file_url,
      github_repo_url: github_repo_url,
      status_code: 200
    };

    // Return the response as JSON
    res.status(200).json(response);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle not found (404) errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
