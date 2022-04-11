const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/i-kali'));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/i-kali/index.html'));
});


app.listen(process.env.PORT || 80);