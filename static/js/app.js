var songApp = angular.module('songApp',['ngRoute','ngMaterial']);

songApp.config([
    "$routeProvider", function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'ListController',
            templateUrl: '../static/html/list.html'
        }).when('/priority', {
            controller: 'PriorityControllor',
            templateUrl: '../static/html/priority.html'
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


songApp.factory('dataStorage', function() {
     var savedData = {}
     function set(data) {
       savedData = data;
     }
     function get() {
      return savedData;
     }

     return {
      set: set,
      get: get
     }

});
