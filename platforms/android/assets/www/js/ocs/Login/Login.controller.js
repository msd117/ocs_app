angular.module('Login.module',[])
.controller('LoginCtrl',LoginCtrl)

LoginCtrl.$inject=['$scope','$state','NetCall','Global','GlobalConstants','$ionicLoading'];
function LoginCtrl($scope,$state,NetCall,Global,GlobalConstants,$ionicLoading){
    
$scope.data={};
$scope.data.userName=Global.getFromLocalStorage("UserName");
$scope.login=function(){
    Global.showLoading();
    var jsondata={
        "userid":Global.getFromLocalStorage("cno"),
        "Pin":$scope.data.PIN
    };
    var URL=GlobalConstants.login;
    console.log(JSON.stringify(jsondata));
    NetCall.httpPOST({
        url:URL,
        data:{'request':jsondata},

        success:function(data,status,headers,config){
            if(data.SUCCESS=="1"){
                // Global.showAlert(GlobalConstants.ErrorHeading,data.message);
                $state.go('dashboard');
                $ionicLoading.hide();
            }else{
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
                $scope.data.pin="";
                $ionicLoading.hide();
            }
        },
        error:function(data,status,headers,config){
             $ionicLoading.hide();
        },
    });
}

$scope.UsernameLogin=function(){
    Global.showLoading();
    var jsondata={
        "mobilenumber":$scope.data.mobilenumber,
        "Pin":$scope.data.PIN
    };
    var URL=GlobalConstants.UsernameLogin;
    console.log(JSON.stringify(jsondata));
    NetCall.httpPOST({
        url:URL,
        data:{'request':jsondata},

        success:function(data,status,headers,config){
            if(data.SUCCESS=="1"){
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
                $state.go('dashboard');
                $ionicLoading.hide();
            }else{
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
                $scope.data.mobilenumber="";
                $scope.data.pin="";
                $ionicLoading.hide();
            }
        },
        error:function(data,status,headers,config){
             $ionicLoading.hide();
        },
    });
}





}
