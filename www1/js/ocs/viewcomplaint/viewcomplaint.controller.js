angular.module('viewcomplaint.module',[])
.controller('viewcomplaint',viewcomplaint);
 
viewcomplaint.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData',"$ionicLoading"];
function viewcomplaint($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData,$ionicLoading) {
    $scope.data={};

    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {
        var dynamicList = passData.getData();
        $scope.data.complaints=dynamicList.viewcomplaint;
    });

    $scope.onListItemClick =function(id){
        // $state.go("complaintbyid",{id:id});
        Global.showLoading()
        var jsondata = {
            "selectedid":id,
            };
        var URL = GlobalConstants.complaintbyid;
        NetCall.httpPOST({
            url: URL,
            data: {
                'request': jsondata
            },
            success: function (data, status, headers, config) {
                // console.log(JSON.stringify(data));
                $ionicLoading.hide();
                if (data.SUCCESS == 1) {
                    // console.log(data);
                    $state.go("complaintbyid",{item:data.records[0]});   
                } else {
                    Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                }
            },
            error: function (data, status, headers, config) {
                $ionicLoading.hide();
            },
        }); // End requestcall
      }
}
