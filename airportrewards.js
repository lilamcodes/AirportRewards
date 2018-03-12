// Hide form to disallow checkin
$("form").hide();

// Update the message
$("p#message").html("Starting app now...");

// Use HTML5 geolocation to track the user
watchUser = navigator.geolocation.watchPosition(success, error);

// success is run when watchPosition is successful 
function success(position){

  // Test if tracking worked in browser console
  console.log("Tracking was successful!");

  // View position object in browser console
  console.log(position);

  // Capture user location coordinates in variables
  var userLat = position.coords.latitude;
  var userLon = position.coords.longitude;

  // Where is the target location? Update here, get lat/lon from google maps
  var targetLat = 32.8998091;
  var targetLon = -97.0425239;

  // Calculate the distance away from the target

  var distance = calculateDistance(userLat, userLon, targetLat, targetLon, "M");

  // Define the radius for application action
  var radius = 8; // in miles
  
  if(distance<=radius){ 
     
    $("p#message").html("You have arrived! Collect your bonus miles");
     //send notification to collect bonus miles
     
     // do this when user is at target location
     
     }
     
     else{
       
       $("p#message").html("You are " + distance.toFixed(2) + " miles away from DFW airport.");
     
     //do this when user is too far away
     
     }
  

} // END success

// When geolocation fails
function error(e) {

  $("p#message").html("Geolocation failed. Please refresh (" + e.message + ")");

} // END error

// From http://www.geodatasource.com/developers/javascript

function calculateDistance(lat1, lon1, lat2, lon2, unit) {

  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var radlon1 = Math.PI * lon1/180;
  var radlon2 = Math.PI * lon2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit=="K") { dist = dist * 1.609344; }
  if (unit=="N") { dist = dist * 0.8684; }
  return dist;

} // END calculateDistance