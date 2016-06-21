songApp.controller('PersonalDataControllor', function($scope,$http,$location,$mdDialog,dataStorage)
{

    $scope.age = 0;
    $scope.gender = "";

    $scope.enter = function(){
        if($scope.age==0 || $scope.gender==""){
            return;
        }
        $http.get("/add-player/"+$scope.age + "/"+$scope.gender)
        .success(function(data,status,headers,config){
            console.log("data??? list ?? ",data.player_id);
            $location.path("/song-list/"+data.player_id);
        })
        .error(function(data, status, headers, config){});
    }





});
