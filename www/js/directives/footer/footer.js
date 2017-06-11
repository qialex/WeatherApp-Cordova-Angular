WeatherApp.directive('footerDirective', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/footer/footer.html',
        controller: ['$scope', '$timeout', 'Weather', 'Network', function($scope, $timeout, Weather, Network) {
			$scope.weather = Weather;
			$scope.network = Network;
			
			$scope.timeSince = 0;
			
			(function calcTimeSince () {
				$scope.timeSince = $scope.weather.lastTime ? Date.now() - $scope.weather.lastTime : 0;
				$timeout(calcTimeSince, 300);
			})();			
        }]
    }
});