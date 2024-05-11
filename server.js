const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 10001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/playerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});

// Create Player model
const Player = mongoose.model('Player', {
    player_id: Number,
    username: String,
    level: Number
});

// Middleware
app.use(bodyParser.json());

// Define routes
app.post('/player/get/:player_id', async (req, res) => {
    const playerId = req.params.player_id;

    // Find player by ID
    const player = await Player.findOne({ player_id: playerId });

    if (!player) {
        return res.status(404).json({ code: 3, msg: "player not found" });
    }

    // Player found, return player data
    res.json({
        code: 1,
        player_id: player.player_id,
        username: player.username,
        level: player.level
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
