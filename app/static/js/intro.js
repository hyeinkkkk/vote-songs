songApp.controller('IntroControllor', function($scope,$http,$location)
{
    $scope.nextPage = function(){
        $location.path("/personal-data");
    };

    // angular.element("#letter").css("color","white");

    var d = document.getElementById("letter1");
    d.setAttribute("style","color:white");

    var d2 = document.getElementById("letter2");
    d2.setAttribute("style","color:white");



});
