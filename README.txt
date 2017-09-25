This small one-page weather app was a fun project through which to practice interacting with APIs and sending GET requests with ajax. 

The app uses HTML5 geolocation to log your long/lat and then sends that with a GET request to the openWeather api. Once the response is received, the weather and temperature are displayed in a bordered div, and the background fades in (with a varying color, which is related to the weather/time of day) revealing the info present on the page in white text.

The background fade-in was my way of hiding the original ugly HTML data while the async request is taking place (takes a couple seconds). Overall I'm quite pleased with this small project. 
