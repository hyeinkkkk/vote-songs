songApp.controller('ResultControllor', function($scope,$http,$location,$mdDialog,dataStorage)
{
    $scope.type = dataStorage.get();

    // $scope.type = {id: 2, description: "선택은 한번도 내 몫인 적이 없는데, 채 꺼내어먹지도 않앗던 마다가스카르 바닐라빈 화고롱에. 넌 지키고 싶은게 너무나 많았기에 와고롱을 양보할 생각이 없었나봐", name: "마다가스카르 바닐라빈 와고롱"}
    console.log("player Type???? ", $scope.type);

    $scope.goHome = function(){
        $location.path("/");
    }





});
