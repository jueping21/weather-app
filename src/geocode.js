import token from "./access-key.js";
import request from "request";
import geocodeError from "./error.js";

// error message for geocode
const GEOCODE_HELP =
    "More details: https://docs.mapbox.com/api/search/geocoding/#geocoding-api-errors";
const CONN_FAIL = "Unable to connect to location services.";
const NOT_FOUND = "Unable to find the location.";

// get geocode request url
const getMapboxURL = (location) => {
    const key = token.mapBox;
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const addr = encodeURIComponent(location);
    const query = `${addr}.json?access_token=${key}`;
    return `${url}&${query}`;
};

geocodeError.from = "geocode";

const geocode = (address, callback) => {
    const mapboxURL = getMapboxURL(address);
    request({ url: mapboxURL, json: true }, (error, response) => {
        if (error) {
            geocodeError.code = -1;
            geocodeError.message = CONN_FAIL;
            callback(geocodeError, undefined);
        } else if (response.statusCode != 200) {
            geocodeError.code = response.statusCode;
            geocodeError.message = GEOCODE_HELP;
            callback(geocodeError, undefined);
        } else if (response.body.features.length == 0) {
            geocodeError.code = 808;
            geocodeError.message = NOT_FOUND;
            callback(geocodeError, undefined);
        } else {
            let location = response.body.features[0].place_name;
            let longtitude = response.body.features[0].center[0];
            let latitude = response.body.features[0].center[1];
            callback(undefined, { latitude, longtitude, location });
        }
    });
};

export default geocode;
