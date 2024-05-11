const express = require('express');
const axios = require('axios');

const app = express();
const port = 10002;
const playerServiceUrl = 'http://localhost:10001';

app.use(express.json());

app.post('/first_reward/collect', async (req, res) => {
    const { player_id } = req.body;
    
    try {
        // Request to Player Service to get player data
        const playerResponse = await axios.post(`${playerServiceUrl}/player/get/${player_id}`);
        
        if (playerResponse.data.code === 1) {
            const { level } = playerResponse.data;
            
            if (level >= 1) {
                // Player can collect rewards
                const rewards = [
                    { "item_key": "gacha-01", "quantity": 5 },
                    { "item_key": "wpn-01", "quantity": 1 }
                ];
                
                // Add rewards to player's inventory
                playerResponse.data.inventory = rewards;
                
                // Return response with updated player data
                res.status(200).json({
                    "code": 1,
                    "msg": "player collected this rewards",
                    "player": playerResponse.data
                });
            } else {
                // Player cannot collect rewards
                res.status(200).json({ "code": 2, "msg": "player cannot collect this rewards" });
            }
        } else {
            // Player not found
            res.status(404).json({ "code": 3, "msg": "player not found" });
        }
    } catch (error) {
        console.error('Failed to collect reward:', error);
        res.status(500).json({ "code": 4, "msg": "nothing" });
    }
});

app.listen(port, () => {
    console.log(`Reward Service is running on port ${port}`);
});
