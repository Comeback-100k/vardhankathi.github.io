const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/emojidb', {
    useNewUrlParser: true, useUnifiedTopology: true
});

// Schema
const EmojiMap = mongoose.model('EmojiMap', new mongoose.Schema({
    word: String,
    emoji: String
}));

// Get all mappings
app.get('/emojis', async (req, res) => {
    const emojis = await EmojiMap.find();
    res.json(emojis);
});

// Add a new mapping
app.post('/add', async (req, res) => {
    const { word, emoji } = req.body;
    await EmojiMap.create({ word, emoji });
    res.json({ status: "added" });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
