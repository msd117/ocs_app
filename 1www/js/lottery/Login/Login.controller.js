angular.module('Login.module',[])
.controller('LoginCtrl',LoginCtrl)

LoginCtrl.$inject=['$scope','$state','NetCall','Global','GlobalConstants','$ionicLoading'];
function LoginCtrl($scope,$state,NetCall,Global,GlobalConstants,$ionicLoading){
    
$scope.data={};
$scope.data.rememberme=true;

$scope.$on("$ionicView.beforeEnter", function(scopes, states) {
    var username=Global.getFromLocalStorage(GlobalConstants.ls_UserName);
    var password=Global.getFromLocalStorage(GlobalConstants.ls_Password);
   
    if(username.length>0){
        scopes.currentScope.data.username=username;
        scopes.currentScope.data.password=password;
        
    }
});
$scope.clearall=function(){
    $scope.data.username="";
    $scope.data.password="";
}

$scope.UsernameLogin=function(){
    Global.showLoading();
    var simno=Global.getFromLocalStorage(GlobalConstants.ls_simno);
    if(simno){
        if($scope.data.rememberme){
            Global.setInLocalStorage(GlobalConstants.ls_UserName, $scope.data.username);
            Global.setInLocalStorage(GlobalConstants.ls_Password, $scope.data.password);
        }
        $state.go('selecttype');
        $ionicLoading.hide();
    }else{
        getdeviceinfo()
    }
   
    // var jsondata={
    //     "mobilenumber":$scope.data.username,
    //     "Pin":$scope.data.password
    // };
    // var URL=GlobalConstants.UsernameLogin;
    // console.log(JSON.stringify(jsondata));
    // NetCall.httpPOST({
    //     url:URL,
    //     data:{'request':jsondata},
    //     success:function(data,status,headers,config){
    //         if(data.SUCCESS=="1"){
    //             // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
    //             $state.go('dashboard');
    //             $ionicLoading.hide();
    //         }else{
    //             // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
    //             $scope.data.mobilenumber="";
    //             $scope.data.pin="";
    //             $ionicLoading.hide();
    //         }
    //     },
    //     error:function(data,status,headers,config){
    //          $ionicLoading.hide();
    //     },
    // });
}





}
