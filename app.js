'use strict';

const express = require('express');
const app = express();
const path = require('path');
const strftime = require('strftime');

app.set('port', (process.env.PORT || 3000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/api/timestamp', (req, res) => {
  res.sendFile(__dirname + '/views/timestamp.html');
});

app.get('/api/timestamp/*', (req,res) => {
  let results = {unix: null, natural: null};
  let entry = path.parse(req.params[0]).base;
  
  if ( isNaN(parseInt(entry)) ) {
    let date = new Date(entry);
    if (!isNaN(date)) {
      results.unix = date.getTime() / 1000;
      results.natural = strftime("%B %d, %Y", date);
    }
  } else {
    let date = new Date(parseInt(entry) * 1000);
    results.unix = entry;
    results.natural = strftime("%B %d, %Y", date);
  }
  
  res.json(results);
  
});

app.listen(app.get('port'), function(){
  console.log('Node is running on ' + app.get('port'));
});

