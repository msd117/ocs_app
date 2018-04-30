angular.module('dashboard.module', [])
    .controller('dashboardCtrl', dashboardCtrl);
    dashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'NetCall', 'Global', 'GlobalConstants', '$filter', '$ionicLoading', '$stateParams','passData'];
function dashboardCtrl($scope, $rootScope, $state, NetCall, Global, GlobalConstants, $filter, $ionicLoading, $stateParams,passData) {

    // $scope.UserName = Global.getFromLocalStorage("UserName");
    // var lastLoginDate = new Date(Global.getFromLocalStorage("LastLoginDate"));
    // $scope.LastLogin = lastLoginDate == "Invalid Date" ? "" : $filter('date')(lastLoginDate, 'medium');


    $scope.appVersion = GlobalConstants.appVersion;

    $scope.goto = function (pageName) {
        if (pageName == "viewcomplaint") {
            Global.showLoading()
            var jsondata = {
                "submittedby":Global.getFromLocalStorage("cno"),
                };
         
            var URL = GlobalConstants.viewcomplaint;
            NetCall.httpPOST({
                url: URL,
                data: {
                    'request': jsondata
                },
                success: function (data, status, headers, config) {
                    //    var decryptedData = Global.decryptString(data.response.toString().replace(/\n/g, ""));
                    //    var obj = JSON.parse(decryptedData);
                    console.log(JSON.stringify(data));
                    $ionicLoading.hide();
                    if (data.SUCCESS == 1) {
                        var dynamicList = passData.getData();
                        dynamicList.viewcomplaint=data.records;
                        passData.saveData(dynamicList);
                        $state.go(pageName);
                        // $state.go("Acknowledgement",{successMsg:obj.message});
                    } else {
                        
                        Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                        
                    }
                },
                error: function (data, status, headers, config) {
                    $ionicLoading.hide();
                },
            }); // End requestcall
        }
        // else if(pageName=='FundTransferMenu'){
        //         var TPINFlag = Global.getFromLocalStorage("TPINFlag");
        //         if(TPINFlag && TPINFlag=='A'){
        //             $state.go(pageName);        
        //         }else{
        //             Global.showAlert('','Please set the Transaction PIN');
        //         }
        // }
        else {
            $state.go(pageName);
        }
    }
}
