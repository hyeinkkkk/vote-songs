songApp.controller('ListController', function($scope,$http,$location,$mdDialog,dataStorage,$routeParams,$sessionStorage)
{
        $scope.selectedArr = new Array();
        // maxCount = 6;
        maxCount = 1;

        playerId = $routeParams['player_id'];
        console.log("player Id is .... ",playerId);

        $http.get("/list")
        .success(function(data,status,headers,config){
            angular.forEach(data.song_list , function(song) {
                song.check = false;
            });
            $scope.songs = data.song_list;
            console.log("data??? list ?? ",data);
        })
        .error(function(data, status, headers, config){});



        $scope.selectSongs = function(item,event){
            if(!item.check){
                item.check = true;
                $scope.selectedArr.push(item);
                // item.priority = $scope.selectedArr.length;
            }else{
                console.log("$scope.selectedArr.indexOf(item)",$scope.selectedArr.indexOf(item));
                $scope.selectedArr.splice($scope.selectedArr.indexOf(item),1);
                item.check = false;
            }

            if($scope.selectedArr.length == maxCount){
                dialogText = ""
                angular.forEach($scope.selectedArr , function(song) {
                    dialogText += song.title //+ ", ";
                });

                $mdDialog.show(
                  $mdDialog.confirm()
                    .title('선택완료!')
                    .textContent(  '"'+ dialogText + '" 로 결정하셨습니까?')
                    .ariaLabel('Primary click demo')
                    .ok('완료')
                    .cancel('다시선택')
                    .targetEvent(event)
                ).then(function() { // 결과 전송(OK)
                    //원래 사용하려던 로직을 살려둔다.
                    // dataStorage.set($scope.selectedArr);
                    // $location.path("/priority/"+playerId);
                    // 원래 로직 끝
                    $http({
                      url: "/submit/"+playerId ,
                      method: "POST",
                      headers: { 'Content-Type': 'application/json' },
                      data: JSON.stringify($scope.selectedArr)
                    }).success(function(data) {
                      dataStorage.set(data.player_type);
                      $sessionStorage.type = data.player_type;
                      $location.path("/result/"+playerId);
                    });

                }, function() { //다시선택(CANCEL)
                    angular.forEach($scope.selectedArr , function(song) {
                        song.check = false;
                    });
                    $scope.selectedArr = [];
                });


            }

            console.log("priorityArr ",$scope.selectedArr);
        };

        $scope.listenToMusic = function(event){
            console.log("듣기 클릭 ");
        }

        $scope.next = function(){
            if(confirm("제출하시겠습니까?")){
                console.log("submit");
                $http({
                  url: "/submit",
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  data: JSON.stringify($scope.selectedArr)
                }).success(function(data) {
                  console.log(data)
                });

            }else{
                console.log("cancel");
            }
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
