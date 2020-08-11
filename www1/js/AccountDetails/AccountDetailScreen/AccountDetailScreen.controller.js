angular.module('AccountDetailScreen.module', [])
    .controller('AccountDetailScreenCtrl', AccountDetailScreenCtrl);

AccountDetailScreenCtrl.$inject = ['$scope', 'Global','GlobalConstants', 'passData','NetCall','$ionicLoading'];
function AccountDetailScreenCtrl($scope, Global,GlobalConstants, passData,NetCall,$ionicLoading) {

    // Global.showLoading();
    // var URL = GlobalConstants.ShowStatementURL;
    // NetCall.httpGET({
    //     url: URL,
    //     success: function (data, status, headers, config) {
    //         if (data.status == "SUCCESS") {
    //             $scope.statementData = JSON.parse(data.response);
    //             var data = passData.getData();
    //             data.statementData=$scope.statementData;
    //             passData.saveData(data);
    //             //$state.go(pageName);
    //             console.log($scope.statementData);
    //             $ionicLoading.hide();
    //         } else {
    //             //$scope.userData = {};
    //             Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
    //             $ionicLoading.hide();
    //         }
    //     },
    //     error: function (data, status, headers, config) {
    //         $ionicLoading.hide();
    //     },
    // }); // End requestcall

    var data = passData.getData();

    console.log(data);
    $scope.selectedUserData=data.selectedUserData;
    $scope.selectedUserDetails=data.selectedUserDetails;

}


