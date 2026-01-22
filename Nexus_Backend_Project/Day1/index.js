const env = require("dotenv").config();
const express = require('express');
const app = express();
const aichat = require('./Aichat');

app.use(express.json()); // convert incoming json data to js object

const chattingHistory = {};
// we  will install our user chat history here
// key value pair me history ko store karenge
// key will be user id value will be array of messages


app.post('/chat', async (req, res) => {
    const { msg, id } = req.body;

    if(!chattingHistory[id]){
        chattingHistory[id] = [];
    }
 
    // extract user history
    const History = chattingHistory[id];

    // History+current ; array
    const promptmessage = [...History ,{  // spread operator
        role:'user',
        parts:[{text:msg}]
    }]



    const ans = await aichat(promptmessage);

    // User question ko bhi insert karna hai 
    // model ke response ko bhi insert karna hai
    History.push({role:'user', parts:[{text:msg}]});
    History.push({role:'model', parts:[{text:ans}]});
    res.send(ans);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
