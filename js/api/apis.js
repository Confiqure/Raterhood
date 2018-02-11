/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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

function getStateFromZip(zipcode){
  var request = new XMLHttpRequest();
  var requestURL = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode;
  var state;
  request.open("GET", requestURL);
  request.onload = function(){
    var responseJSON = JSON.parse(request.responseText);
    console.log( responseJSON );
    state = responseJSON(['results'][0]['geometry']['location']['lng']);
    return state;
  };
}

function getNearbyZipCodes(local_zip)
{
    return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open( 'GET', 'https://www.zipcodeapi.com/rest/js-JjMMmEtIsTuB9auc1hQ8PimXXHZFrAr724TyHJnxQh9zKeQfV37gkb0fNoUbpPPv/radius.csv/'+local_zip+'/10/miles?minimal');
    req.onload = function(){
        if (req.status == 200) {
            // Resolve the promise with the response text
            var zips = req.response.trim().split("\n");
            zips.shift();
            resolve(zips);
        }
        else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
        }
    };
    req.onerror = function() {
        reject(Error("Network Error"));
    };
    req.send();
  });
}