angular.module('AddAmount.module', [])
    .controller('AddAmountCtrl', AddAmountCtrl);

    AddAmountCtrl.$inject = ['$scope', '$state', 'NetCall', 'Global', 'GlobalConstants', '$rootScope', '$ionicLoading','passData'];
function AddAmountCtrl($scope, $state, NetCall, Global, GlobalConstants, $rootScope, $ionicLoading,passData) {
    $scope.userData = {};

     var data = passData.getData(); 
    // data.travelType = item; 
    // passData.saveData(data);
if(data.membersList && data.membersList.length>0){
    
    $scope.membersList = data.membersList;

}else{

    Global.showLoading();
    var URL = GlobalConstants.MembersURL;
    NetCall.httpGET({
        url: URL,
        success: function (data, status, headers, config) {
            if (data.status == "SUCCESS") {
                $scope.membersList = data.data;
                $ionicLoading.hide();
            } else {
                $scope.userData = {};
                Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                $ionicLoading.hide();
            }
        },
        error: function (data, status, headers, config) {
            $ionicLoading.hide();
        },
    }); // End requestcall
}        
    $scope.gotoConfirm = function (formData) {
        if (formData) {

            if(isNaN($scope.userData.amount) || $scope.userData.amount=="" || $scope.userData.amount==undefined || parseFloat($scope.userData.amount) < 1){
                $scope.submitted = true;
                $scope.userData.amount = "";
            }else{
                $scope.submitted = false;
                Global.showLoading();
                
            //     var jsondata = {
            //         "Password":$scope.userData.transactionPIN
            //     }
              
            //    console.log(JSON.stringify(jsonData));
            //    var URL = GlobalConstants.AddAmountURL;
            //    NetCall.httpPOST({
            //        url: URL,
            //        data: {
            //            'request': jsondata
            //        },
            //        success: function (data, status, headers, config) {
            //           // var decryptedData = Global.decryptString(data.response.toString().replace(/\n/g, ""));
            //           // var obj = JSON.parse(decryptedData);
            //            console.log(data);
   
            //            if (data.status == "SUCCESS") {
            //                Global.setInLocalStorage("TokenId", obj.tokenId);
   
            //                var tokenId = Global.getFromLocalStorage("TokenId");
            //                var userId = Global.getFromLocalStorage("UserId");
            //                var registerMobileNumber = Global.getFromLocalStorage("RegisteredMobileNumber");
   
                           var jsondata = {
                            "MemberId":$scope.userData.selectedMember,
                            "EntryDate":$scope.userData.date,
                            "Amount":$scope.userData.amount,
                            "Total":$scope.userData.total
                            };
                        //    var encryptedData = Global.encryptJson(jsondata);
                           console.log(JSON.stringify(jsondata));
                           var URL = GlobalConstants.AddAmountURL;
                           NetCall.httpPOST({
                               url: URL,
                               data: {
                                   'request': jsondata
                               },
                               success: function (data, status, headers, config) {
                                //    var decryptedData = Global.decryptString(data.response.toString().replace(/\n/g, ""));
                                //    var obj = JSON.parse(decryptedData);
                                   console.log(data);
                                   if (data.status == "SUCCESS") {
                                      // Global.setInLocalStorage("TokenId", obj.tokenId);
                                       Global.showAlert(GlobalConstants.infoAlertHeader, data.message);
                                       $ionicLoading.hide();
                                       //$state.go("homemenu");
                                      // $state.go("Acknowledgement",{successMsg:obj.message});
                                   } else {
                                       $scope.userData = {};
                                       Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                                       $ionicLoading.hide();
                                   }
                               },
                               error: function (data, status, headers, config) {
                                   $ionicLoading.hide();
                               },
                           }); // End requestcall
   
            //            } else {
            //                 $scope.userData = {};
            //                Global.showAlert(GlobalConstants.errorAlertHeader, obj.message);
            //                $ionicLoading.hide();
            //                var RegistrationMode = Global.getFromLocalStorage("RegistrationMode");
   
            //                if (obj.message == GlobalConstants.SessionTerminateMSG) {
            //                    $rootScope.$emit("logoutSuccess");
            //                    if (RegistrationMode == "CARD") {
            //                        $state.go("DebitCardLogin");
            //                    } else {
            //                        $state.go("LoginTabs.InternetBankingLogin");
            //                    }
   
            //                } else {
            //                    $state.go("FundTransferMenu");
            //                }
            //            }
            //        },
            //        error: function (data, status, headers, config) {
            //            $ionicLoading.hide();
            //        },
            //    });
            }
            
        } else {
            $scope.submitted = true;
        }
    }


}