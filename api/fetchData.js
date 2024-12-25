export default async function handler(req, res) {
  const apiKey = process.env.API_KEY; // Access the hidden API key
  const apiUrl = process.env.ENDPOINT; // External API URL without query parameters for POST

    try {
      // The body from the client request
      const requestBody = req.body;

      // Send POST request to the external API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(requestBody), // Send the body of the request
      });

      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        return res.status(response.status).json({ error: 'External API error' });
      }

      // Parse the response from the external API
      const data = await response.json();

      // Return the data to the frontend
      res.status(200).json(data);

    } catch (error) {
      // Catch any other errors (e.g., network issues)
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  } 

