angular.module('dashboard.module', [])
    .controller('dashboardCtrl', dashboardCtrl);
    dashboardCtrl.$inject = ['$scope', '$rootScope', '$state', 'NetCall', 'Global', 'GlobalConstants', '$filter', '$ionicLoading', '$stateParams','passData'];
function dashboardCtrl($scope, $rootScope, $state, NetCall, Global, GlobalConstants, $filter, $ionicLoading, $stateParams,passData) {

    // $scope.UserName = Global.getFromLocalStorage("UserName");
    // var lastLoginDate = new Date(Global.getFromLocalStorage("LastLoginDate"));
    // $scope.LastLogin = lastLoginDate == "Invalid Date" ? "" : $filter('date')(lastLoginDate, 'medium');


    $scope.appVersion = GlobalConstants.appVersion;

    $scope.goto = function (pageName) {
        switch(pageName){
            case "mydetails":
                Global.showLoading()
                var jsondata = {
                    "selectedid":Global.getFromLocalStorage("cno"),
                    };
                console.log(JSON.stringify(jsondata));
                var URL = GlobalConstants.mydetails;
                NetCall.httpPOST({
                    url: URL,
                    data: {
                        'request': jsondata
                    },
                    success: function (data, status, headers, config) {
                        console.log(JSON.stringify(data));
                        $ionicLoading.hide();
                        if (data.SUCCESS == 1) {
                            // console.log(data);
                            $state.go("mydetails",{item:data.userDetails[0]});   
                        } else {
                            Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                        }
                    },
                    error: function (data, status, headers, config) {
                        $ionicLoading.hide();
                    },
                }); // End requestcall
            break;
            case "viewcomplaint":
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
                        console.log(JSON.stringify(data));
                        $ionicLoading.hide();
                        if (data.SUCCESS == 1) {
                            var dynamicList = passData.getData();
                            dynamicList.viewcomplaint=data.records;
                            passData.saveData(dynamicList);
                            $state.go(pageName);
                        } else {
                            Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                        }
                    },
                    error: function (data, status, headers, config) {
                        $ionicLoading.hide();
                    },
                }); // End requestcall
            break;
            case "viewcomplaintnearme":
                Global.showLoading()
                var jsondata = {
                    "submittedby":Global.getFromLocalStorage("cno"),
                    };
            
                var URL = GlobalConstants.viewcomplaintnearme;
                NetCall.httpPOST({
                    url: URL,
                    data: {
                        'request': jsondata
                    },
                    success: function (data, status, headers, config) {
                        console.log(JSON.stringify(data));
                        $ionicLoading.hide();
                        if (data.SUCCESS == 1) {
                            var dynamicList = passData.getData();
                            dynamicList.viewcomplaintnearme=data.records;
                            passData.saveData(dynamicList);
                            $state.go(pageName);
                        } else {
                            Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                        }
                    },
                    error: function (data, status, headers, config) {
                        $ionicLoading.hide();
                    },
                }); // End requestcall
            break;
            // case "":
            // break;
            // case "":
            // break;
            // case "":
            // break;
            default:
                $state.go(pageName);
            break;



        }

    }
}
