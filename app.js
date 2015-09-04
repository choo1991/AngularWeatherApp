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
    this.daysToShow = 5;
    
});

// Controllers
weatherApp.controller('homeController' , ['$scope', 'cityService', function($scope, cityService) {
    $scope.cityObject = {city: cityService.currentCity};
    $scope.$watch('cityObject.city', function() {
        cityService.currentCity = $scope.cityObject.city;
    });
}]);

weatherApp.controller('forecastController' , ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    $scope.currentCity = cityService.currentCity;
    
    $scope.cityServiceMethods = {
        checkDaysShown: function(days) {
            return days === cityService.daysToShow;
        },
        setDaysShown: function(days) {
            cityService.daysToShow = days;
        }
    }
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK" }, {get: { method: "JSONP"}});
    
    $scope.retrieveWeatherData = function() {
        $scope.forecastResult = $scope.weatherAPI.get({ q: $scope.currentCity, mode: 'json', units: 'imperial', cnt: cityService.daysToShow});
    }
    
    $scope.$watch('cityService.daysToShow', function() {
        $scope.retrieveWeatherData();
    });
    
    
}]);