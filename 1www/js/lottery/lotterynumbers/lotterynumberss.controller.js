angular.module('lotterynumbers.module', [])
    .controller('lotterynumberssCtrl', lotterynumberssCtrl);
    lotterynumberssCtrl.$inject = ['$scope', '$rootScope', '$state', 'NetCall', 'Global', 'GlobalConstants', '$filter', '$ionicLoading', '$stateParams','passData'];
function lotterynumberssCtrl($scope, $rootScope, $state, NetCall, Global, GlobalConstants, $filter, $ionicLoading, $stateParams,passData) {

    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {
        if(states.direction==="forward"){
            var dynamicList = passData.getData();
            dynamicList.lotteryarray=[];
            passData.saveData(dynamicList);
        }
       
    });
    $scope.data={};
    var lotteryarray=[]
    var firstValue = true;
    var dynamicList = passData.getData();
    dynamicList.lotteryarray=[];
    $scope.data.selectedLotterytype=dynamicList.selectedLotterytype;
    $scope.passcode = "";
    $scope.totalAmount=0;
    $scope.issubmit =false; 
    $scope.data.type="A"
    $scope.placeholder="Enter lottery No .."
    $scope.pinpasswordadd = function(value) {
        // if ($scope.passcode.length < 6) {
            if (firstValue) {
                $scope.passcode = value.toString();
                firstValue = false;
            } else {
                $scope.passcode = $scope.passcode + value.toString();
            }
            
    }

    $scope.pinpasswordsubmit = function() {
        if ($scope.passcode.length > 0){ 
            $scope.issubmit =true;
            $scope.pinaddanother();
        }else if (lotteryarray.length > 0) {
            dynamicList.lotteryarray=JSON.stringify(lotteryarray);
            dynamicList.lotterytype =$scope.data.type; 
            dynamicList.totalAmount =$scope.totalAmount; 
            passData.saveData(dynamicList);
            $state.go("lotterynumberconfirm")
        }else {
            Global.showAlert(GlobalConstants.errorAlertHeader,"Please Enter a lotery Number");
        }
    }
    $scope.pinaddanother = function() {
        if ($scope.passcode.length > 0) {
            var lotteryString = $scope.passcode;
            if(!lotteryString.endsWith("X") && !lotteryString.startsWith("X") && lotteryString.indexOf("X")!=-1){
                var lastinedexofX = lotteryString.lastIndexOf("X");
                var amount =lotteryString.substring(lastinedexofX+1, lotteryString.length);
                var lootteryno =lotteryString.substring(0, lastinedexofX+1);
                lottervalues={
                    "lotteryno":lootteryno,
                    "amount":amount
                }
                $scope.totalAmount= parseFloat(amount) + parseFloat($scope.totalAmount);
                lotteryarray.push(lottervalues);
                $scope.passcode=""
                if($scope.issubmit ==true){
                    $scope.issubmit =false;
                    $scope.pinpasswordsubmit();
                }
            }else {
                $scope.issubmit =false;
                Global.showAlert(GlobalConstants.errorAlertHeader,"A lottery Number musht Have \"X\" in it and cannot start or end with \"X\"");
            }
        }
        }
    
    $scope.pinpasswordclear = function() {

        $scope.passcode="";
    }
    $scope.pinpassworddelete = function() {

        if ($scope.passcode.length > 0) {
            $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
        }
    }
}
