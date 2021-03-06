songApp.controller('PriorityControllor', function($scope,$http,$location,$mdDialog,dataStorage,$routeParams,$translate)
{

    maxCount = 3;

    $scope.language = $translate.use();
    playerId = $routeParams['player_id'];
    console.log("player id is .... ",playerId);

    resetSongs = function(){
        $scope.priorityArr = new Array();
        angular.forEach(dataStorage.get() , function(song) {
            song.priorityCheck = false;
            song.priority = 0;
        });
    }

    resetSongs();
    $scope.songs = dataStorage.get();

    $scope.selectSongs = function(item,event){
        if(!item.check)
            return;

        if(!item.priorityCheck){
            item.priorityCheck = true;
            $scope.priorityArr.push(item);
            item.priority = $scope.priorityArr.length;
        }else if(item.priorityCheck && item.priority == $scope.priorityArr.length){
            item.priorityCheck = false;
            item.priority = 0;
            $scope.priorityArr.pop();

        }

        if($scope.priorityArr.length == maxCount){
            dialogText = ""
            angular.forEach($scope.priorityArr , function(song) {
                dialogText +=  song.priority + "." + song['title_'+$translate.use()] + ", ";
            });

            $translate(['select_complete','choice_done','try_again','ok']).then(function (translations) {

                $mdDialog.show(
                  $mdDialog.confirm()
                    .title(translations.choice_done)
                    .textContent('"'+ dialogText + '"' + translations.select_complete)
                    .ariaLabel('Primary click demo')
                    .ok(translations.ok)
                    .cancel(translations.try_again)
                    .targetEvent(event)
                ).then(function() { // 결과 전송(OK)
                    $http({
                      url: "/submit/"+playerId ,
                      method: "POST",
                      headers: { 'Content-Type': 'application/json' },
                      data: JSON.stringify($scope.priorityArr)
                    }).success(function(data) {
                        dataStorage.set(data.player_type);
                        // $sessionStorage.type = data.player_type;
                        $location.path("/result/"+playerId);
                    });


                }, function() { //다시선택(CANCEL)
                    resetSongs();
                    });
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
