const env = require("dotenv").config();
const express = require('express');
const app = express();
const aichat = require('./Aichat');

app.use(express.json()); // convert incoming json data to js object

app.post('/chat', async (req, res) => {
    const { msg } = req.body;

    const msgForAI = [
        {
            role: "user",
            parts: [
                { text: msg }
            ]
        }
    ];

    const ans = await aichat(msgForAI);
    res.send(ans);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
