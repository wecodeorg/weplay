const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let weatherDesc = "";
let temp = "";
let query = "";
let imageURL = "";
let degree = "";
let music = "";

app.get("/", function(req,res)
{
    res.render("list", {weatherDesc: weatherDesc, temp: temp, query: query, imageURL: imageURL, degree: degree, music: music}); 
});

app.post("/", function(req,res)
{
    query = req.body.cityName;
    const apikey = "ed67d60dc78a073a96dd4c42d6820947";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ apikey +"&units="+unit;

    https.get(url, function(response){

        response.on("data", function(data){
            // JSON Parse (converts in js Objects)
            const weatherData = JSON.parse(data);
            temp = weatherData.main.temp;
            weatherDesc = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon ;
            imageURL= "https://openweathermap.org/img/wn/" + icon+"@2x.png";
            degree = "°C";
            res.redirect("/");

            switch (icon) {
            case '01d':
            case '01n':
                console.log("A");
                music = "https://open.spotify.com/embed/playlist/6GwxANcfxvevumRd371w6U";
                break;
            case '02d':
            case '02n':
                console.log("B");
                music = "https://open.spotify.com/embed/playlist/1CmxM3Z83xogtRNaVBV3j3";
                break;
            case '03d':
            case '03n':
                console.log("C");
                music = "https://open.spotify.com/embed/playlist/4MSNnRm3nxUlUtXrFHEhLl";
                break;
            case '04d':
            case '04n':
                console.log("D");
                music ="https://open.spotify.com/embed/playlist/1VJxvirhgTtwud2goRcJWv";
                break;
            case '09d':
            case '09n':
                console.log("E");
                music = "https://open.spotify.com/embed/playlist/4qZxsjSX4kdAuLAhzBQNCs";
                break;
            case '10d':
            case '10n':
                console.log("F");
                music ="https://open.spotify.com/embed/playlist/3KiwmZHTFsq9DWPA5tGPID";
            case '11d':
                console.log("G");
                music ="https://open.spotify.com/embed/playlist/5RBul7U3RSkNeZLlaX5Q2z";
                break;
             case '13d':
             case '13n':
                console.log("H");
                music = "https://open.spotify.com/embed/playlist/14zu2CMDgku3DKNGb5poQi";
                break;
            case '50d':
            case '50n':
                console.log("I");
                music = "https://open.spotify.com/embed/playlist/4tsEbRWKDhb5YZSXhLO31I";
                break;
            default:
                console.log("null");
                break;
        }
        
        });

    });
});

app.listen(3000, function()
{
    console.log("started");
})

//2nd method in app.post --
// const weatherData = JSON.parse(data);
// const icon = weatherData.weather[0].icon ;
// console.log("object: " + weatherData.main.temp);
// const imageURL= "https://openweathermap.org/img/wn/" + icon+"@2x.png";

// res.write("<h1>yo" + weatherData.main.temp + "</h1>");
// res.write("<h1>The weather in "+ query +" is "+ weatherData.weather[0].description + " degrees Celcius.</h1>");
// res.write("<img src="+ imageURL + ">");


 // console.log(temp);
        // console.log(weatherdesc);
        // // JSON Stringify (converts all in JSON string)
        // const object = {name:"sneha",sem:"sixth"}
        // console.log(JSON.stringify(object));
      
        

