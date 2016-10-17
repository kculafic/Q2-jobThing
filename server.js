'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const path = require('path');
app.disable('x-powered-by');
app.use(express.static(path.join('public')));
const users = require('./routes/users');


app.use(users);

// app.use((req, res) => {
//   res.send('Hello World');
// });

app.listen(port, () => {

    // eslint-disable-next-line no-console
    console.log('Listening on port', port);

});
module.exports = app;
// const xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${mood}&api_key=dc6zaTOxFJmzC`);
//
// xhr.done(function(data) {
//   imageTabsDiv = $('#images').get(0);
//   for (let i = 0; i < data.data.length; i++) {
//     const img = document.createElement('img');
//
//     img.src = data.data[i].images.fixed_height.url;
//     imageTabsDiv.appendChild(img);
//   }
// });
