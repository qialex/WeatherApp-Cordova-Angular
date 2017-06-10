var WeatherApp = angular.module('WeatherApp', ['ngRoute', 'ngCordova']);
    // .config(['$compileProvider', function ($compileProvider) {
    //     $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    // }])
WeatherApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/', {
		template: '<main-directive></main-directive>'
	})
	.when('/about', {
		template: '<about-directive></about-directive>'
	})
	.otherwise({redirectTo: '/'});
}]);