WeatherApp.directive('footerDirective', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/footer/footer.html',
        controller: ['$scope', '$timeout', '$rootScope', '$cordovaNetwork', 'Weather', function($scope, $timeout, $rootScope, $cordovaNetwork, Weather) {
			$scope.timeSince;
			$scope.timeIn = 0;
			$scope.weather = Weather;
			$scope.networkStatus = $cordovaNetwork.isOnline() ? 'online' : 'offline';
			
			function calcTimeSince () {
				$scope.timeSince = Weather.lastTime ? Math.round((Date.now() - Weather.lastTime)/1000) : 'never';
				$scope.timeIn = $scope.timeSince == 'never' ? 0 : Math.max(Weather.updateEvery/1000 - $scope.timeSince,0);
				$timeout(calcTimeSince, 1000);
			}
			calcTimeSince ();
            
			$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
				$scope.networkStatus = 'online';
			});		
			$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
				$scope.networkStatus = 'offline';
			})	
			
        }]
    }
});