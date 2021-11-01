const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

/**
 * Define path for Express config
 */
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/**
 *  Set up handlebars engine and views location
 */
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

/**
 * Setup static directory to serve
 */
app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "XuanThuy",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address term",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, address } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    location: {
                        latitude,
                        longitude,
                    },
                    address,
                    forecastData,
                });
            });
        }
    );
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "XuanThuy",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "XuanThuy",
    });
});

app.get("/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "XuanThuy",
    });
});

app.listen(port, () => {
    console.log("Server is up on port ", port);
});
