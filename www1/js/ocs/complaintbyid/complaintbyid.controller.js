angular.module('complaintbyid.module',[])
.controller('complaintbyid',complaintbyid);
 
complaintbyid.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData',"$ionicLoading","$stateParams"];
function complaintbyid($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData,$ionicLoading,$stateParams) {
    $scope.data={};
    // console.log($stateParams.item);
    var selectedcomplaint= $stateParams.item;
      
    var dynamicList = passData.getData();

    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {

        $scope.selectedimage=selectedcomplaint.image;
        $scope.data.address=selectedcomplaint.address;
        $scope.data.complainttype=selectedcomplaint.complainttype;
        $scope.data.date=selectedcomplaint.date;
        $scope.data.description=selectedcomplaint.description;
        $scope.data.status=selectedcomplaint.status;

        // Global.showLoading()
        // var jsondata = {
        //     "selectedid":$scope.data.selectedid,
        //     };
     
        // var URL = GlobalConstants.complaintbyid;
        // NetCall.httpPOST({
        //     url: URL,
        //     data: {
        //         'request': jsondata
        //     },
        //     success: function (data, status, headers, config) {
        //         console.log(JSON.stringify(data));
        //         $ionicLoading.hide();
        //         if (data.SUCCESS == 1) {
        //             console.log(data);
        //         //    $scope.data.selectedcomplaint=data.records;
        //         $scope.selectedimage=data.records[0].image;
        //         $scope.data.address=data.records[0].address;
        //         $scope.data.complainttype=data.records[0].complainttype;
        //         $scope.data.date=data.records[0].date;
        //         $scope.data.description=data.records[0].description;
        //         $scope.data.status=data.records[0].status;
                    
        //         } else {
                    
        //             Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                    
        //         }
        //     },
        //     error: function (data, status, headers, config) {
        //         $ionicLoading.hide();
        //     },
        // }); // End requestcall

         
      });



}
