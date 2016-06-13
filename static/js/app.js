var songApp = angular.module('songApp',['ngRoute','ngMaterial']);

songApp.config([
    "$routeProvider", function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'ListController',
            templateUrl: '../static/html/list.html'
        // }).when('/home', {
        //     controller: 'HomeCtrl',
        //     templateUrl: 'common/home.html'
        // }).when('/player-display', {
        //     controller: 'PlayerDisplayCtrl',
        //     controllerAs: 'pCtrl',
        //     templateUrl: 'display/player-display.html'
        // }).when('/timer-display', {
        //     controller: 'TimerDisplayCtrl',
        //     templateUrl: 'display/timer-display.html'
        // }).when('/video-display', {
        //     controller: 'VideoDisplayCtrl',
        //     templateUrl: 'display/video-display.html'
        }).otherwise({
            redirectTo: "/"
        });
    }
]);




songApp.controller('FormController2',
    function($scope,$http)
    {
        $scope.modText = "하하하하";
        $scope.buttonClicked = function()
        {
            $scope.modText = "Hello "+$scope.inputText;
            initPromise = $http.get("/list");
            initPromise.success(function(data, status, headers, config) {
                console.log("get!");
                $scope.modText = data;
            });
            initPromise.error(function(data, status, headers, config) {
            });
        };

    });
