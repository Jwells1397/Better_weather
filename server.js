const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

app.get('/weather', async (req, res) => {
  try {
    const url = 'https://weather.com/weather/today/l/a496cfcba367ffae60ccfdc94e31bcf3d0a12ac6515336dbd274f381a932abbc';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const currentTempElement = $('#todayDetails > section > div > div.TodayDetailsCard--hero--2QGgO > div.TodayDetailsCard--feelsLikeTemp--2x1SW > span.TodayDetailsCard--feelsLikeContainer--2bePz > span');
    const currentTemp = currentTempElement.length > 0 ? currentTempElement.text().trim() : 'N/A';


    res.json({ currentTemp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});