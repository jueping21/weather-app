import express from "express";
import path from "path";
import url from "url";
import hbs from "hbs";
import geocode from "./geocode.js";
import forecast from "./forecast.js";
import weatherError from "./error.js";
const app = express();

// Node.js ES6 modules
// access __filename and __dirname
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Defines path for express.
const __public = path.join(__dirname, "../public");
const __viewPath = path.join(__dirname, "../templates/view");
const __partials = path.join(__dirname, "../templates/partials");

// set up handlebars engine and view location for dynamic webpages
app.set("view engine", "hbs");
app.set("views", __viewPath);
hbs.registerPartials(__partials);

// use static directory to serve
// looks here first because it is a synchronous function!.
app.use(express.static(__public));

//for root
app.get("", (req, res) => {
    res.render("index", { title: "Weather", name: "Jueping" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About", name: "Jueping" });
});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help", name: "Jueping" });
});

app.get("/weather", (req, res) => {
    const addr = req.query.address;
    if (!addr) {
        weatherError.from = "weather request";
        weatherError.code = 608;
        weatherError.message = "Missing the value of address";
        return res.send(weatherError);
    }
    geocode(addr, (geocodeError, data) => {
        if (geocodeError) {
            return res.send(geocodeError);
        }
        forecast(
            data.latitude,
            data.longtitude,
            (forecastError, forecastData) => {
                if (forecastError) {
                    return res.send(forecastError);
                }
                forecastData.location = data.location;
                res.send(forecastData);
            }
        );
    });
});

app.get("*", (req, res) => {
    res.render("404", { title: "404", name: "Jueping", errorMessage: "404" });
});

// listen for the request
app.listen(8000, () => {
    console.log("Server is up on port 8000");
});
