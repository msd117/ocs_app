angular.module('complaintbyid.module', [])
    .controller('complaintbyid', complaintbyid);

complaintbyid.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants', 'passData', "$ionicLoading", "$stateParams"];
function complaintbyid($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants, passData, $ionicLoading, $stateParams) {
    $scope.data = {};
    // console.log($stateParams.item);
    var selectedcomplaint = $stateParams.item;

    var dynamicList = passData.getData();

    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {

        $scope.selectedimage = selectedcomplaint.image;
        $scope.data.address = selectedcomplaint.address;
        $scope.data.complainttype = selectedcomplaint.complainttype;
        $scope.data.date = selectedcomplaint.date;
        $scope.data.description = selectedcomplaint.description;
        $scope.data.status = selectedcomplaint.status;

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
    $scope.share = function () {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            message: $scope.data.description, // not supported on some apps (Facebook, Instagram)
            subject: $scope.data.complainttype + '\n' + $scope.data.description, // fi. for email
            files: ['', ''], // an array of filenames either locally or remotely
            url: 'https://ocs-project.000webhostapp.com/review/71',
            chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
            // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
            // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
        };

        
        var onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };

        var onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }




}
