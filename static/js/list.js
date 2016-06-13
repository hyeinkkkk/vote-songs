songApp.controller('ListController', function($scope,$http,$location,$mdDialog)
    {
        $scope.modText = "Hello ";
        $scope.songs = [
            {name:"a",check:false,priority:0},
            {name:"b",check:false,priority:0},
            {name:"c",check:false,priority:0}
        ];
        $scope.priorityArr = new Array();

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

            if($scope.priorityArr.length == $scope.songs.length){
                $mdDialog.show(
                  $mdDialog.confirm()
                    .title('선택완료!')
                    .textContent('결정하셨습니까?')
                    .ariaLabel('Primary click demo')
                    .ok('완료')
                    .cancel('다시선택')
                    .targetEvent(event)
                ).then(function() { // 결과 전송(OK)
                    $http({
                      url: "/submit",
                      method: "POST",
                      headers: { 'Content-Type': 'application/json' },
                      data: JSON.stringify($scope.priorityArr)
                    }).success(function(data) {
                      console.log(data)
                    });
                    console.log('You decided to get rid of your debt.');
                }, function() { //다시선택(CANCEL)
                    console.log('You decided to keep your debt.');
                });


            }

            console.log("priorityArr ",$scope.priorityArr);
        };

        $scope.next = function(){
            if(confirm("제출하시겠습니까?")){
                console.log("submit");
                $http({
                  url: "/submit",
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  data: JSON.stringify($scope.priorityArr)
                }).success(function(data) {
                  console.log(data)
                });
                // initPromise = $http.post("/submit", { data : $scope.priorityArr});
                // initPromise.success(function(data, status, headers, config) {
                //     console.log("success!  " , data);
                //
                // });
                // initPromise.error(function(data, status, headers, config) {
                // });
            }else{
                console.log("cancel");
            }
            // $mdDialog.show(
            //   $mdDialog.alert()
            //     .title('Primary Action')
            //     .textContent('Primary actions can be used for one click actions')
            //     .ariaLabel('Primary click demo')
            //     .ok('Awesome!')
            //     .targetEvent(event)
            // );
        }

        function DialogController($scope, $mdDialog) {
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.answer = function(answer) {
                $mdDialog.hide(answer);
              };
            }




    });
