const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');
//import router
const router = require('./routes')


const app = express();



app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const port = 3000;

// app.get('/',(req,res) =>{
//     res.send("Hello World");
// });


//define routes
app.use('/api', router);

app.get('/uploads/:filename',(req,res)=> {
    res.sendFile(path.join(__dirname,'uploads',req.params.filename));
});


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});