songApp.controller('ResultControllor', function($scope,$http,$location,$mdDialog)
{
    $scope.enter = function(){
        $http.get("/add-player/"+$scope.age + "/"+$scope.gender)
        .success(function(data,status,headers,config){
            console.log("data??? list ?? ",data.player_id);
            $location.path("/song-list/"+data.player_id);
        })
        .error(function(data, status, headers, config){});
    }





});
