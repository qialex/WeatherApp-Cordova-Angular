WeatherApp.directive('mainDirective', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/main/main.html',
        controller: ['$scope', 'Geolocation', 'Rest', 'Weather', function ($scope, Geolocation, Rest, Weather) {
			$scope.weather = Weather;
			$scope.geolocation = Geolocation;			
			
			$scope.newCity = '';
			$scope.Math = window.Math;
			
			$scope.changeCity = function () {
				if ($scope.newCity.length < 3 || $scope.newCity.length > 10 || $scope.weather.updateInProgress) {
					return;
				}
				
				Weather.process($scope.newCity);
				$scope.newCity = '';
				angular.element(document.querySelectorAll(".cityTextInput"))[0].blur();
			}
			
			$scope.clearCity = function () {
				if ($scope.weather.updateInProgress) {
					return;
				}				
				Weather.process();
			}			
			
			$scope.keydown = function(e) {
				if (e.charCode === 13) {
					$scope.changeCity();
				}
			};
		}]
    }
});