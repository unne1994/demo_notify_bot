const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Time = require('./utils/Time.js');
const appService = require('./services/appService.js');
//bot
const botRouter = require('./controller/bot/EzLineBot.js');
require('dotenv').config();


app.get('/', (req, res) => {
  console.log(`${Time.LogTime()} call`);
  res.send(`welcome api`);
  res.end();
});

// Add headers
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


app.post('/test', (req, res) => {

  res.send("test glitch hello ez api");

  res.end();
})

app.use('/', botRouter);


// appService.appMain('onceNotify' , 1);



app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})