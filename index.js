import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.APPID);
const app = express();
const port = 3000;

const apiKEY = process.env.APPID;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    try {
        // console.log(req.body);
        const city = req.body.city;
        const cityName = req.body.cityName;
        const response_coord = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKEY}`
        );

        // console.log(response_coord);

        var latitude = response_coord.data[0].lat;
        var longitude = response_coord.data[0].lon;

        // console.log(latitude);
        // console.log(longitude);

        const response_weather = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,rain,cloud_cover,wind_speed_10m,wind_direction_10m`
        );

        // console.log(cityName);

        // console.log(response_weather.data);

        res.render("index.ejs", {
            data: response_weather.data,
            city: cityName,
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "Choose a city",
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
