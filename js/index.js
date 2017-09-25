'use strict'

//Setting some global var's to capture data sent from weather api, not sure if necessary
var weather = "";
var weatherDescription = "";
var temp = "";
var inCels = true;

//Title casing function (I wrote this for an earlier FCC challege. Recycling!)
function titleCase(str) {
  str = str.toLowerCase();
  var capsArray = [];
  var wordArray = str.split(" ");
  for (var i=0; i < wordArray.length; i++){
    var letterArray = wordArray[i].split("");
    letterArray[0] = letterArray[0].toUpperCase();
    capsArray.push(letterArray.join(""));
    console.log(letterArray);
    console.log(capsArray);
  }
  var capsString = capsArray.join(" ");
  return capsString;
}

//Function for converting temperature...I'm getting tired. I set a global called inCels up top. Playing with it here, unsure if this works. Trying to figure out how to make a toggleable function. Next up, add a click listener to #borderDiv and have it try to run this function with temp as an argument. MAKE SURE TO have listener below the api response that instatiates temp as a variable.(I think this is important)
function swapTemp (startTemp) {
  var newTemp;
  if (inCels === true) {
    newTemp = Math.round(startTemp*9/5 + 32);
    temp = newTemp;
    newTemp += " °F";
    document.getElementById('temp').innerHTML = newTemp;
    inCels = false;
    return newTemp;
  } else {
    newTemp = Math.round((startTemp - 32) * 5/9);
    temp = newTemp;
    newTemp += " °C";
    document.getElementById('temp').innerHTML = newTemp;
    inCels = true;
    return newTemp;
  }
} 

//Getting users geolocation using getCurrentPostion()
var myLocation = document.getElementById('myLocation');
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, failure);
  } else {
    myLocation.innerHTML = "Geolocation not supported.";
  }
}

//If geolocation works
function showPosition(position) {
  $.ajax({
  type: "GET",
  url: "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
  dataType: "json",
  success: function(response) {
    console.log(response);
    console.log(response.name);
    myLocation.innerHTML = response.name;
    temp = Math.round(response.main.temp);
    document.getElementById('temp').innerHTML = temp + " °C";
    weather = response.weather[0].main;
    weatherDescription = response.weather[0].description;
    document.getElementById('sky').innerHTML = titleCase(weatherDescription); 
    weather = weather.toLowerCase();
    console.log(weather);
    
    $('#borderDiv').click(function() {
      swapTemp(temp);
    });
    //Setting SkyCon and background color based on the response.main text from the fcc/openweather api call. A few nested if statements check for time to display a day or night icon/background accordingly.
    
    var time = new Date().getHours();
    
    if (weather.search(/clear/i) >= 0) {
        if (time > 6 && time < 19) {
           skycons.set('icon', Skycons.CLEAR_DAY);
           document.body.style.background = "orange";
        } else {
           skycons.set('icon', Skycons.CLEAR_NIGHT);
           document.body.style.background = "#291d72";
        }
     
    } else if (weather.search(/clouds/i) >= 0) {
        if (time > 6 && time < 19) {
           skycons.set('icon', Skycons.PARTLY_CLOUDY_DAY);
           document.body.style.background = "grey";
        } else {
           skycons.set('icon', Skycons.PARTLY_CLOUDY_NIGHT);
           document.body.style.background = "#291d72";
        }
    
    } else if (weather.search(/atmosphere/i ) >= 0) {
      skycons.set('icon', Skycons.FOG);
      document.body.style.background = "blue";
      
    } else if (weather.search(/rain/i) >= 0 || weather.search(/thunder/i) >= 0 || weather.search(/drizzle/i) >= 0 || weatherDescription.search(/storm/i) >= 0 || weatherDescription.search(/hurricane/i) >= 0) {
      skycons.set('icon', Skycons.RAIN);
      document.body.style.background = "#5FBDCE";
    
    } else if (weather.search(/snow/i ) >= 0) {
      skycons.set('icon', Skycons.SNOW);
      document.body.style.background = "#679ED2";
    
    } else {
      skycons.set('icon', Skycons.CLEAR_DAY);
      document.body.style.background = "red";
    }
        
    
  },
  failure: function(response) {
    window.alert("Error: " + response)
  }
});
  console.log(position.coords.latitude, position.coords.longitude);  
  skycons.play();
  
}


//If geolocation doesn't work
function failure () {
  window.alert("Geolocation didn't work!");
};

//Execute get location! 
getLocation();

//jQuery for the hover-to-show temp change instructions
$("#borderDiv").hover(function() {
  $("#tempText").fadeTo(500, 1);
}, function() {
  $("#tempText").fadeTo(500, 0);
});


//Skycon stuff below

var skycons = new Skycons({"color": "white"}); //Sets icon color to white
var condition = "Skycons.CLEAR_DAY"; //Default icon. Gets changed during API response handling (which is delayed)

skycons.play();

console.log(weather);