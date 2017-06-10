WeatherApp.service('Rest', ["$http", "$q", function($http, $q) {
    
	var server = 'http://api.openweathermap.org/data/2.5/weather';
	var APP_ID = 'da889d55faf13a8822d05d1e87c39460';
	
    this.act = function (data) {
		var self = this;
		var deferred = $q.defer();
		
		function onSuccess (position) {
			self.coords = position.coords;
			deferred.resolve();
		}
		
		function onError () {
			deferred.reject();
		}
		
		params = data.city ? {q: data.city} : {lat: data.latitude, lon: data.longitude};
		params.appid = APP_ID;
		params.units= 'metric';
		
		$http({
			method: 'GET',
			url: server,
			params: params,
			headers: {'Content-Type': 'application/json'}
			
		}).then(function successCallback(response) {
		
			deferred.resolve(response.data);
			
		}, function errorCallback () {


			deferred.reject({type:'network_error'});
		});
		
		return deferred.promise;
	}
	
}]);