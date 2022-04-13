const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/m1p9mean-jahnhah'));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/m1p9mean-jahnhah/index.html'));
});

const PORT = process.env.PORT || 80
app.listen(PORT);
console.log('app listen on ' + PORT)