songApp.controller('PersonalDataControllor', function($scope,$http,$location,$mdDialog,$sessionStorage,dataStorage)
{
    console.log($sessionStorage.playerId);

    // if($sessionStorage.playerId != undefined){
    //     playerId = $sessionStorage.playerId;
    //     dataStorage.set($sessionStorage.type);
    //     $location.path("/result/"+playerId);
    // }

    $scope.age = 0;
    $scope.gender = "";

    $scope.enter = function(){
        if($scope.age==0 || $scope.gender==""){
            return;
        }
        $http.get("/add-player/"+$scope.age + "/"+$scope.gender)
        .success(function(data,status,headers,config){
            console.log("data??? list ?? ",data.player_id);
            $sessionStorage.playerId = data.player_id;
            $location.path("/song-list/"+data.player_id);
        })
        .error(function(data, status, headers, config){});
    }





});
