angular.module('selecttype.module',[])
.controller('selecttype',selecttype);
 
selecttype.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData'];
function selecttype($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData) {
    
    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {
        var dynamicList = passData.getData();
            scopes.currentScope.data.complaints= dynamicList.lotterytype;
        

        
                     
      
    
});
      $scope.activeTab = "Login";
      $scope.data={};
     
      $scope.submit= function(selectedcomplaint){
           
            var dynamicList = passData.getData();
            dynamicList.selectedcomplaint=selectedcomplaint;
            passData.saveData(dynamicList);
            cordova.plugins.diagnostic.isLocationAvailable(function(available){
                  if(available){
                        $state.go('complaintdetails');
                  }else{
                        // function calldialog() {
                        document.addEventListener("deviceready",function() {
                              cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to works.",//message
                              "Use GPS, with wifi or 3G.",//description
                              function(buttonIndex){//callback
                              switch(buttonIndex) {
                              case 0: break;//cancel
                              case 1: break;//neutro option
                              case 2: break;//user go to configuration
                              }},
                              "Please Turn on GPS",//title
                              ["Cancel","Later","Go"]);//buttons
                        });
                        //      }
                  }
                
                  
                  console.log("Location is " + (available ? "available" : "not available"));
              }, function(error){
                 
                  console.error("The following error occurred: "+error);
              });
           
      };
}


