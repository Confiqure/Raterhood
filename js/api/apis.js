/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getLatLongFromZip(zipcode){
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        var requestURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode;
        var latLong = [];
        request.open("GET", requestURL);
        request.onload = function(){
            if (request.status === 200) {
                var responseJSON = JSON.parse(request.responseText);
                console.log( responseJSON );
                latLong.push(responseJSON['results'][0]['geometry']['location']['lat']);
                latLong.push(responseJSON['results'][0]['geometry']['location']['lng']);
                console.log( responseJSON );
                resolve(latLong);
            }
            else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error("Network Error"));
        };
        request.send();
    });
}

function getStateFromZip(zipcode)
{
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        var requestURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode;
        var state;
        request.open("GET", requestURL);
        request.onload = function(){
            if (request.status === 200) {
                var responseJSON = JSON.parse(request.responseText);
                state = responseJSON['results'][0]['address_components'][3]['long_name'];
                console.log( state );
                resolve(state);
            }
            else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error("Network Error"));
        };
        request.send();
    });
}

function getNearbyZipCodes(local_zip)
{
    return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open( 'GET', 'https://www.zipcodeapi.com/rest/js-JjMMmEtIsTuB9auc1hQ8PimXXHZFrAr724TyHJnxQh9zKeQfV37gkb0fNoUbpPPv/radius.csv/'+local_zip+'/10/miles?minimal');
    request.onload = function(){
        if (request.status === 200) {
            // Resolve the promise with the response text
            var zips = request.response.trim().split("\n");
            zips.shift();
            resolve(zips);
        }
        else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(request.statusText));
        }
    };
    request.onerror = function() {
        reject(Error("Network Error"));
    };
    request.send();
  });
}

function getSpotCrimeData(long_state)
{
    return new Promise(function(resolve, reject) {
        state = abbrState(long_state, 'abbr');
        var request = new XMLHttpRequest();
        request.open( 'GET', 'https://api.usa.gov/crime/fbi/ucr/estimates/states/'+state+'?page=1&per_page=1000&output=json&api_key=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv');
        request.setRequestHeader('Accept', 'application/json');
        request.onload = function(){
            if (request.status === 200) {
                var json_data = JSON.parse( request.response );
                var length = (json_data['results'].length);
                var relevant_data = json_data['results'][length-1];
                var total_crimes = relevant_data['aggravated_assault'] + relevant_data['burglary'] + relevant_data['homicide'];
                total_crimes += relevant_data['caveats'] + relevant_data['rape_legacy'] + relevant_data['violent_crime'];
                total_crimes += relevant_data['larceny'] + relevant_data['property_crime'] + relevant_data['robbery'];
                total_crimes += relevant_data['rape_revised'] + relevant_data['motor_vehicle_theft'];
                var population = relevant_data['population'];
                var solution = (total_crimes/population)*100;
                console.log( solution );
                resolve(solution);
            }
            else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
                reject(Error(request.statusText));
            }
        };
    request.onerror = function() {
        reject(Error("Network Error"));
    };
    request.send();
  });
}

function getHomeScore(latLong)
{
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open( 'GET', 'https://apis.solarialabs.com/shine/v1/total-home-scores/reports?lat=' + latLong[0] + '&lon=' + latLong[1] + '&apikey=PKDoANGJvzGBIuWE0iVjA3rpvQlkmA5F');
        var solution = [];
        request.onload = function(){
            if (request.status === 200) {
                var json_data = JSON.parse( request.response );
                solution = (json_data['totalHomeScores']['safety']['value'] * 0.7);
                solution += (json_data['totalHomeScores']['quiet']['value'] * 0.3);
                console.log( solution );
                resolve(solution);
            }
            else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
                reject(Error(request.statusText));
            }
        };
    request.onerror = function() {
        reject(Error("Network Error"));
    };
    request.send();
  });
}
