import token from "./access-key.js";
import request from "request";
import forecastError from "./error.js";

// error message for geocode
const CONN_FAIL = "Unable to connect to location services.";

const getForecastURL = (latitude, longitude) => {
    const baseURL = "https://api.weatherbit.io/v2.0/current?";
    const location = `lat=${latitude}&lon=${longitude}`;
    const key = `key=${token.weatherbit}`;
    return `${baseURL}${location}&${key}`;
};

forecastError.from = "weatherbit";

const forecast = (latitude, longitude, callback) => {
    let requestURL = getForecastURL(latitude, longitude);
    request({ url: requestURL, json: true }, (error, response) => {
        if (error) {
            forecastError.code = -1;
            forecastError.message = CONN_FAIL;
            callback(forecastError, undefined);
        } else if (response.statusCode != 200) {
            forecastError.code = response.statusCode;
            forecastError.message = response.body.error;
            callback(forecastError, undefined);
        } else {
            let result = {
                app_temp: response.body.data[0].app_temp,
                temp: response.body.data[0].temp,
                city_name: response.body.data[0].city_name,
                country_code: response.body.data[0].country_code,
            };
            callback(undefined, result);
        }
    });
};

export default forecast;
