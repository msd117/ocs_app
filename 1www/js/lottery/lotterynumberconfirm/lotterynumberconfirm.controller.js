angular.module('lotterynumberconfirm.module', [])
    .controller('lotterynumberconfirmCtrl', lotterynumberconfirmCtrl);
    lotterynumberconfirmCtrl.$inject = ['$scope', '$rootScope', '$state', 'NetCall', 'Global', 'GlobalConstants', '$filter', '$ionicLoading', '$stateParams','passData'];
function lotterynumberconfirmCtrl($scope, $rootScope, $state, NetCall, Global, GlobalConstants, $filter, $ionicLoading, $stateParams,passData) {

   

    $scope.data={};
    var dynamicList = passData.getData();
    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {

        scopes.currentScope.data.submittedlottery=JSON.parse(dynamicList.lotteryarray);
        scopes.currentScope.data.lotterytype=dynamicList.lotterytype;
        scopes.currentScope.data.totalAmount=dynamicList.totalAmount;
        scopes.currentScope.data.selectedLotterytype=dynamicList.selectedLotterytype;
        
    });
    $scope.submit=function(){
        Global.showAlert(GlobalConstants.ErrorHeading,"Request Submitted Successfully");
        $state.go('selecttype')
    }
    
    $scope.share=function(){
        var lotterys="";
        for(i=0;i<$scope.data.submittedlottery.length;i++){
            lotterys=lotterys +"Amount: "+ $scope.data.submittedlottery[i].amount + " Number: " + $scope.data.submittedlottery[i].lotteryno +" \n"
        }
//  Dont Indent this code otherwisae it will extra space in the  message which is shared
var messageToshare=`Lottery Name :: ${$scope.data.selectedLotterytype}
type :: ${$scope.data.lotterytype}
Submiited Lotteries ::
${lotterys}
Total Amount :: ${$scope.data.totalAmount} `;


        var shareoptions = {
            message: messageToshare,
            subject: null, 
            files: null,
            url: null,
            chooserTitle: 'Submitted Lottery' // Android only, you can override the default share sheet title
        }

        var onSuccess = function(result) { $globalService.hideLoading(); }
        var onError = function(msg) {}
        window.plugins.socialsharing.shareWithOptions(shareoptions, onSuccess, onError);

    }
}
