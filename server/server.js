const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath)); //Serve up the Public folder

// app.get('/', (req, res) => {
//   res.render('index.html');
// });
console.log(__dirname + '/../public');
console.log(publicPath);


app.listen(port, () => {
  console.log(`Started up port ${port}`);
});
