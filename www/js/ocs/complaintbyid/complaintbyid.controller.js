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

        
         
      });



}
