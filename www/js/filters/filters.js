WeatherApp.filter('timeSinceFilter', function() {
  return function(timeSince) {	  	
    return timeSince ? Math.round((timeSince)/1000) : 'never';
  }
});
WeatherApp.filter('timeIn', ["$filter", "CONST", function($filter, CONST) {
  return function(lastTime) {
    return lastTime ? Math.max(CONST.WEATHER_UPDATE_EVERY/1000 - $filter('timeSinceFilter')(lastTime),0) : 0;
  }
}]);
WeatherApp.filter('coordsFilter', function() {
  return function(coord) {
    return Math.round(coord * 100) / 100;
  }
});
