songApp.controller('ResultControllor', function($scope,$http,$location,$routeParams,$mdDialog,dataStorage,$translate)
{

//    $translate.use("en");
    $scope.language = $translate.use();


    $scope.type = dataStorage.get();
    playerId = $routeParams['player_id'];


    if($scope.type.id == undefined){
        $http.get("/submit/"+playerId)
        .success(function(data,status,headers,config){
            $scope.type = data.player_type;

        })
        .error(function(data, status, headers, config){});
    }

    $scope.type.description = "<p>" + $scope.type['description_'+$scope.language] + "</p>"
    $scope.goHome = function(){
        $location.path("/");
    }





});
