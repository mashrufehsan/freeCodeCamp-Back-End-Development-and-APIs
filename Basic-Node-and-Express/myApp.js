let express = require('express');
let app = express();


// 1

console.log("Hello World")

/*
// 2

app.get('/', (req, res)=>{
    res.send("Hello Express")
})
*/

//3
const absolutePath = __dirname + '/views/index.html'

app.get('/', (req, res)=>{
    res.sendFile(absolutePath)
})

//4

app.use('/public', express.static(__dirname + '/public'))

































 module.exports = app;
