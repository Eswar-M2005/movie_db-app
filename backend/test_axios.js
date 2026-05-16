const axios = require('axios');
const https = require('https');

const agent = new https.Agent({ family: 4 });

axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=6211f80ed4af3034f42f29f8ddf4ab42', {
  httpsAgent: agent,
  headers: { 'User-Agent': 'Mozilla/5.0' }
})
.then(res => console.log('Success:', res.status))
.catch(err => console.log('Error:', err.message));
