function getHomeScore(lat, lon) {
    $.ajax({
        type: 'GET',
        url: 'https://apis.solarialabs.com/shine/v1/total-home-scores/reports?lat=' + lat + '&lon=' + lon + '&apikey=PKDoANGJvzGBIuWE0iVjA3rpvQlkmA5F',
        success: function (data) {
          if (data.totalHomeScores.hasOwnProperty('quiet')) {
            console.log('quiet: ' + data.totalHomeScores.quiet.value);
            console.log('safety: ' + data.totalHomeScores.safety.value);
          } else {
            console.log('quiet: 0');
            console.log('safety: 0');
          }
        }
    });
}
