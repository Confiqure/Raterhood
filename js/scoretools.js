function getLatLongFromZip(zipcode){
  var request = new XMLHttpRequest();
  var requestURL = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode;
  var latLong = [];
  request.open("GET", requestURL);
  request.onload = function(){
    var responseJSON = JSON.parse(request.responseText);
    latLong.push(['results'][0]['geometry']['location']['lat']);
    latLong.push(['results'][0]['geometry']['location']['lng']);
    return latLong;
  };
}
