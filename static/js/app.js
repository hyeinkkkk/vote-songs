var songApp = angular.module('songApp',['ngRoute','ngMaterial','ngStorage']);

songApp.config([
    "$routeProvider", function($routeProvider) {
        $routeProvider.when('/', {
            controller: 'IntroControllor',
            templateUrl: '../static/html/intro.html'
        }).when('/personal-data', {
            controller: 'PersonalDataControllor',
            templateUrl: '../static/html/personal-data.html'
        }).when('/song-list/:player_id', {
            controller: 'ListController',
            templateUrl: '../static/html/list.html'
        }).when('/priority/:player_id', {
            controller: 'PriorityControllor',
            templateUrl: '../static/html/priority.html'
        }).when('/result/:player_id', {
            controller: 'ResultControllor',
            templateUrl: '../static/html/result.html'
        }).otherwise({
            redirectTo: "/"
        });
    }
]);

songApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red', {
        'default': 'A100', // by default use shade 400 from the pink palette for primary intentions
        'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
        'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
      // If you specify less than all of the keys, it will inherit from the
      // default shades
      .accentPalette('purple', {
        'default': '200' // use shade 200 for default, and keep all other shades the same
      });
});


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
