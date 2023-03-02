const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = 'AIzaSyBx_gW1PqBDeBXE_oK36bg-lBzYV0vBANo';

app.get('/distance', async (req, res) => {
  const city1 = req.query.city1;
  const city2 = req.query.city2;

  // check if city1 and city2 are valid
  if (!city1 || !city2) {
    res.status(400).json({ error: 'Origin and destination are required' });
    return;
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${city1}&destinations=${city2}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      res.status(500).json({ error: 'Unable to retrieve distance' });
      return;
    }

    const distance = response.data.rows[0].elements[0].distance.text;
    console.log(distance)
    res.json({ distance });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to retrieve distance' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});










