
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res)
{
    res.render("list"); 
});
app.post("/", function(req,res)
{
    const query = req.body.cityName;
    const apikey = "ed67d60dc78a073a96dd4c42d6820947";
    const unit = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid="+ apikey +"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
   
    response.on("data", function(data){
         // JSON Parse (converts in js Objects)
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherdesc = weatherData.weather[0].description; 
        const icon = weatherData.weather[0].icon ;
        const imageURL= "https://openweathermap.org/img/wn/" + icon+"@2x.png";
     
        res.write("<p>The weather is currently " + weatherdesc + "</p>");
        res.write("<h1>The temperature in "+ query +" is "+ temp + " degrees Celcius.</h1>");
        res.write("<img src="+ imageURL + ">");

        switch (icon) {
            case '01d':
                console.log("A");
                break;
            case '02d':
                console.log("B");
                break;
            case '03d':
                console.log("C");
                break;
            case '04d':
                console.log("D");
                break;
            case '09d':
                console.log("E");
                break;
            case '10d':
                console.log("F");
                break;
            case '11d':
                console.log("G");
                break;
             case '13d':
                console.log("H");
                break;
            case '50d':
                console.log("I");
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