var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    });
});

// Services
weatherApp.service('cityService', function() {
    this.currentCity = "Seattle, WA";
});

// Controllers
weatherApp.controller('homeController' , ['$scope', 'cityService', function($scope, cityService) {
    $scope.cityObject = {city: cityService.currentCity};
    $scope.$watch('cityObject.city', function() {
        cityService.currentCity = $scope.cityObject.city;
    });
}]);

weatherApp.controller('forecastController' , ['$scope', 'cityService', function($scope, cityService) {
    $scope.currentCity = cityService.currentCity;
}]);