export default async function handler(req, res) {
  const apiKey = process.env.API_KEY; 

  const apiUrl = process.env.ENDPOINT;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data); // Return the API response to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
