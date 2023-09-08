const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Function to format a date as "YYYY-MM-DDTHH:mm:ssZ"
function formatUTCDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

// Define a route that handles GET requests to /api
app.get('/api', (req, res) => {
  try {
    // Get query parameters
    const slack_name = req.query.slack_name || 'hokageCodes';
    const track = req.query.track || 'backend';

    // Get current day of the week
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDay = currentDate.toLocaleDateString('en-US', options);

    // Get current UTC time in the desired format
    const utc_time = formatUTCDate(currentDate);

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

// Start the server on your actual deployment URL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEPLOYMENT_URL || 'http://localhost:3000'}`);
});
