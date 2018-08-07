angular.module('mydetails.module',[])
.controller('mydetails',mydetails);
 
mydetails.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData',"$ionicLoading","$stateParams"];
function mydetails($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData,$ionicLoading,$stateParams) {
    $scope.data={};
    // console.log($stateParams.item);
    var mydetails= $stateParams.item;
      
    var dynamicList = passData.getData();

    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {

        $scope.data.name=mydetails.name;
        $scope.data.mobilenumber=mydetails.mobilenumber;
        $scope.data.emailid=mydetails.emailid;
      
      });



}
