const nreq = require('./lib/NReq');

// 3.1
nreq.post('http://localhost:10001/player/get/15003', (err, response, body) => {
    if (!err && response.statusCode === 200) {
        console.log(body);
    } else {
        console.error("Error:", err);
    }
});

// 3.2
let payload1 = { "player_id": 15001 };
nreq.post('http://localhost:10002/first_reward/collect', { json: payload1 }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        console.log(body);
    } else {
        console.error("Error:", err);
    }
});

// 3.3
let payload2 = { "player_id": 15002 };
nreq.post('http://localhost:10002/first_reward/collect', { json: payload2 }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        console.log(body);
    } else {
        console.error("Error:", err);
    }
});
