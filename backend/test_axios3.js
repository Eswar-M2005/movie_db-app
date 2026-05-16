const axios = require('axios');

async function run() {
  try {
    const r1 = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=6211f80ed4af3034f42f29f8ddf4ab42', {
      headers: { 'User-Agent': 'curl/8.7.1' }
    });
    console.log('r1:', r1.status);
    const r2 = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=6211f80ed4af3034f42f29f8ddf4ab42', {
      headers: { 'User-Agent': 'curl/8.7.1' }
    });
    console.log('r2:', r2.status);
  } catch (err) {
    console.log('Error:', err.message);
  }
}
run();
