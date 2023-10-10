const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' })); // Adjust the origin as needed

mongoose.connect('mongodb+srv://admin:admin@cluster0.ttlhfnf.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Url = require('./models/urlModel');

app.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const shortUrl = 'http://yourdomain.com/' + shortid.generate(); // Replace with your domain
  
    const url = new Url({ longUrl, shortUrl });
  
    try {
      await url.save();
      res.json({ shortUrl });
    } catch (error) {
      console.error('Error saving URL to the database:', error);
      res.status(500).json({ error: 'Unable to save the URL' });
    }
  });  

app.get('/api/shortUrl/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortUrl: 'http://yourdomain.com/' + shortId });

    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
  
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});