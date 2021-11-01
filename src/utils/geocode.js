const request = require("request");

const geocode = (address, callback) => {
    const url_geocoding =
        "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1Ijoic3VhbnRodXkiLCJhIjoiY2t2NW1raDI4OTE1ZDMwbWF4YWJ6NzM5diJ9.arQkzL-O35ctOnnE0puRgA&limit=1";

    request({ url: url_geocoding, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                address: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
