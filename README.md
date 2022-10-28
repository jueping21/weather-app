### About
This Weather App provides the user easy to find the current weather by an address or keywords. 
- A simple server to handle the requests and responses using node js.
- It uses Geocoding API to implement the feature of getting geo coordinates by providing an address or keywords.
- It uses Weatherbit API to fetch the current weather by geo coordinates.

### Run the application
- Set up Geocoding and Weatherbit tokens in node-tutorial/weather-app/src/access-key.js
```javascript
// set up the tokens
let weatherbit = "your token";
let mapBox = "your token";

export default {
	weatherbit,
	mapBox
};
```

- Run command 
```script
npm install
node ./src/app.js
```

- visit http://localhost:8000/