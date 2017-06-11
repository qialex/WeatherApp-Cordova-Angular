WeatherApp.service('Network', ["$rootScope", '$cordovaNetwork', function($rootScope, $cordovaNetwork) {
	var self = this;
	this.isOnline = $cordovaNetwork.isOnline();
	this.status = this.isOnline ? 'online' : 'offline';

	(function startWatching () {
		$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
			self.isOnline = true;
			self.status = 'online';
		});		
		$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
			self.isOnline = false;
			self.status = 'offline';
		})
	})();
}]);