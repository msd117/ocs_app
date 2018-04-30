angular.module('UserAccountDetails.module', [])
    .controller('UserAccountDetailsCtrl', UserAccountDetailsCtrl);

UserAccountDetailsCtrl.$inject = ['$scope', '$rootScope', '$state', 'NetCall', 'Global', 'GlobalConstants','$filter' ,'$ionicLoading', '$stateParams','passData'];
function UserAccountDetailsCtrl($scope, $rootScope, $state, NetCall, Global, GlobalConstants, $filter, $ionicLoading, $stateParams,passData) {
  

    Global.showLoading();
    var URL = GlobalConstants.ShowStatementURL;
    NetCall.httpGET({
        url: URL,
        success: function (data, status, headers, config) {
            if (data.status == "SUCCESS") {
                $scope.statementData = data.response;
                var data = passData.getData();
                data.statementData=$scope.statementData;
                passData.saveData(data);
                //$state.go(pageName);
                console.log($scope.statementData);
                $ionicLoading.hide();
            } else {
                //$scope.userData = {};
                Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                $ionicLoading.hide();
            }
        },
        error: function (data, status, headers, config) {
            $ionicLoading.hide();
        },
    }); // End requestcall

//}
  

    $scope.userDetails = function (selectedUserData) {
        Global.showLoading();
       
        var jsondata = {
            "memberId": selectedUserData.MemberId
        };
        //console.log(JSON.stringify(jsondata));
        //var encryptedData = Global.encryptJson(jsondata);
        var URL = GlobalConstants.userStatementDetails;
        NetCall.httpPOST({
            url: URL,
            data: {
                'request': jsondata
            },
            success: function (data, status, headers, config) {
               // var decryptedData = Global.decryptString(data.response.toString().replace(/\n/g, ""));
               // var obj = JSON.parse(decryptedData);
                console.log(data);
                if (data.status == "SUCCESS") {
                   // Global.setInLocalStorage("TokenId", obj.tokenId);
                   // var AccDetails = "";
                   var selectedUserDetails=data.response;
                   var data = passData.getData();
                   data.selectedUserData=selectedUserData;
                   data.selectedUserDetails=selectedUserDetails;
                   passData.saveData(data);

                    $ionicLoading.hide();
                    $state.go("AccountDetailScreen");
                } else {
                    $ionicLoading.hide();
                    Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                }
            },
            error: function (data, status, headers, config) {
                //console.log(data);
                $ionicLoading.hide();
            },
        }); // End requestcall

    }
}
