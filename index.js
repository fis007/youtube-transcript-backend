const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/transcript', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('youtube.com')) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    res.json({ transcript });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
