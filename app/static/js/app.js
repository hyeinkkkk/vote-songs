var songApp = angular.module('songApp',['ngRoute','ngMaterial','ngSanitize','pascalprecht.translate']);

songApp.config([
    "$routeProvider", function($routeProvider) {
        $routeProvider.when('/a', {
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
            redirectTo: "/personal-data"
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


songApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', {
    'list_description': '<b>Please choose 3 songs that you enjoyed most.</b>',
    'choice_done': 'Done!',
    'select_complete' : 'is your choice. Are you sure?',
    'try_again': 'Try Again',
    'ok': 'ok',
    'prioritise': 'Please prioritize your choices.',
    'leave_the_concert' : 'EXIT',
    'your_choice_is':'What kind of person are you among Solati?'
  });

  $translateProvider.translations('ko', {
    'list_description': '오늘 공연 중,<br><b>가장 좋았던 노래 3곡을 선택해주세요.</b>',
    'choice_done': '선택완료!',
    'select_complete' : '로 결정하시겠습니까?',
    'try_again': '다시 선택',
    'ok': '완료',
    'prioritise': '선택한 곡의 <br>우선순위를 <b>정해주세요</b>',
    'leave_the_concert' : '공연 나가기',
    'your_choice_is':'쏠라티의 음악을 사랑하는 당신은?'
  });

  $translateProvider.preferredLanguage('ko');
}]);