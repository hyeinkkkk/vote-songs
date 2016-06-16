songApp.controller('PriorityControllor', function($scope,$http,$location,$mdDialog,dataStorage,$routeParams)
{

    maxCount = 6;

    playerId = $routeParams['player_id'];
    console.log("player id is .... ",playerId);

    resetSongs = function(){
        $scope.priorityArr = new Array();
        angular.forEach(dataStorage.get() , function(song) {
            song.check = false;
            song.priority = 0;
        });
    }

    resetSongs();
    $scope.songs = dataStorage.get();

    $scope.selectSongs = function(item,event){
        if(!item.check){
            item.check = true;
            $scope.priorityArr.push(item);
            item.priority = $scope.priorityArr.length;
        }else if(item.check && item.priority == $scope.priorityArr.length){
            item.check = false;
            $scope.priorityArr.pop();
            item.priority = 0;
        }

        if($scope.priorityArr.length == maxCount){
            dialogText = ""
            angular.forEach($scope.priorityArr , function(song) {
                dialogText +=  song.priority + "." + song.title + ", ";
            });

            $mdDialog.show(
              $mdDialog.confirm()
                .title('선택완료!')
                .textContent(  dialogText + '결정하셨습니까?')
                .ariaLabel('Primary click demo')
                .ok('완료')
                .cancel('다시선택')
                .targetEvent(event)
            ).then(function() { // 결과 전송(OK)
                // dataStorage.set($scope.selectedArr);
                $http({
                  url: "/submit/"+playerId ,
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  data: JSON.stringify($scope.priorityArr)
                }).success(function(data) {
                  console.log(data)
                });
                $location.path("/result/"+playerId);
            }, function() { //다시선택(CANCEL)
                resetSongs();
            });


        }

        console.log("priorityArr ",$scope.selectedArr);
    };

    $scope.listenToMusic = function(event){
        console.log("듣기 클릭 ");
    }


    $scope.showAdvanced = function(ev, item) {
       $mdDialog.show({
         controller: DialogController,
         templateUrl: '../static/html/lyric-dialog.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         locals: {
           item: item
         }
       });

     };

    function DialogController($scope, $mdDialog,item) {
        $scope.item = item;

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    }




});
