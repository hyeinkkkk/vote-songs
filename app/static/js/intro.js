songApp.controller('IntroControllor', function($scope,$http,$location)
{
    $scope.nextPage = function(){
        $location.path("/personal-data");
    };




});
