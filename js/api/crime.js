function getNearZipCodes(local_zip)
{
    var request = new XMLHttpRequest();
    request.open( 'GET', 'https://www.zipcodeapi.com/rest/js-JjMMmEtIsTuB9auc1hQ8PimXXHZFrAr724TyHJnxQh9zKeQfV37gkb0fNoUbpPPv/radius.csv/'+local_zip+'/10/miles?minimal');
    //request.setRequestHeader('Accept', 'application/json');
    request.onload = function(){
        console.log( request.response );
        console.log( request.status );
        var important_zips = request.response.split("\n");
        important_zips.shift();
        console.log( important_zips );
    };
    request.send();
}