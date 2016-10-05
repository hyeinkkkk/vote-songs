songApp.controller('PersonalDataControllor', function($scope,$http,$location,$mdDialog,dataStorage,$translate)
{

    $scope.age = 0;
    $scope.gender = "";
    $scope.language = "ko";

    $scope.enter = function(){
        if($scope.age==0 || $scope.gender==""){
            return;
        }
        $translate.use($scope.language);

        $http.get("/add-player/"+$scope.age + "/"+$scope.gender+"/"+$scope.language)
        .success(function(data,status,headers,config){
            console.log("data??? list ?? ",data.player_id);
            $location.path("/song-list/"+data.player_id);
        })
        .error(function(data, status, headers, config){});
    }





});
