songApp.controller('ResultControllor', function($scope,$http,$location,$mdDialog,dataStorage)
{
    $scope.type = dataStorage.get();

    // $scope.type = {id: 2, description: "느슨한 티셔츠 같던 우리 사이를 해결해줄 조개롱", name: "조개롱"}
    console.log("player Type???? ", $scope.type);


    $scope.goHome = function(){
        $location.path("/");
    }





});
