const express = require('express');
const https = require('https');
const app = express();
const changer = require('./outVoice');
const cors = require('cors');
const axios = require('axios')

var whether;
// var bodyParser = require('body-parser')

// app.use(express.urlencoded({extended: true}));
app.use(express.json())// const corsOption = {
//     origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOption));
//if you want in every domain then
app.use(cors())

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);

/************************************/
    https.get('https://api.openweathermap.org/data/2.5/weather?q=tunis&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e&fbclid=IwAR3RcY4GsdruqmHC8jpDprhDTj3rlHPy1x5LtlrzTboIi8dQrwq7a9vfzRg',
    (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
        data = JSON.parse(data);
        // console.log("data: ",data);
        // console.log("whether: ",data.weather);

        const obj = {
            main: data.weather[0].main,
            description: data.weather[0].description
        }
        res.json(obj);
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

/**************************************/
})


app.get('/ahla', (req, res) => {
    try{
        change(req, res)
    } catch (err){
        console.log(err);
    }
})

app.post('/inVoice', async (req, res) => {
    // console.log(req.body.msg);
    const chosenCity = req.body.msg;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e';
    // const rawResponse =  fetch(url)
    //     .then(data => console.log("dara: ",data))
    //     .catch(err => console.log("err ",err));    changer(req, res)
    try{
        const response = await axios.get(url)
        if(response.data){
            whether = 'The weather in ' + response.data.name + ' is ' + response.data.weather[0].main + '.';
            changer(whether, res)
        }
    }catch(err){
        console.log(err);
    }
})

app.get('/anything', (req, res) => {
    if(whether){
        res.json(whether);
    }else{
        res.json({msg: 'no data found !'})
    }
})

app.delete('/', (req, res) => {
    whether=''
})


module.exports = app;