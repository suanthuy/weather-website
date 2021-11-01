const request = require("request");

/**
 * http://api.weatherstack.com/current?access_key=fd4ec39587124a3f8ef8c57ce5ca293c&query=Hanoi&units=m
 * http://api.weatherstack.com/current?access_key=fd4ec39587124a3f8ef8c57ce5ca293c&query=21.033,105.850&units=m
 */

const forecast = (latitude, longitude, callback) => {
    const url_weather =
        "http://api.weatherstack.com/current?access_key=fd4ec39587124a3f8ef8c57ce5ca293c&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";

    request({ url: url_weather, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const message =
                body.current.weather_descriptions +
                ". It is currently " +
                body.current.temperature +
                " degress out. It feels like " +
                body.current.feelslike +
                " degress out.\n" +
                " The humidity is " +
                body.current.humidity +
                "%." +
                " The cloud cover is " +
                body.current.cloudcover +
                "%.";
            callback(undefined, message);
        }
    });
};

module.exports = forecast;
