let express = require('express');
let app = express();
require('dotenv').config(); // this is required to access the .env file

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

// 7

app.use((req, res, next)=>{
    console.log(req.method + ' ' + req.path + ' - ' + req.ip)
    next()
})

/*
//5
app.get('/json',(req, res)=>{
    res.json({message: "Hello json"})
})
*/

//6

app.get('/json',(req, res)=>{
    
    if(process.env.MESSAGE_STYLE == 'uppercase'){
        res.json({message: 'HELLO JSON'})
    }
    else{
        res.json({message: 'Hello json'})
    }
})















 module.exports = app;
