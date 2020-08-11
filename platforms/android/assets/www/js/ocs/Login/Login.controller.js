angular.module('Login.module',[])
.controller('LoginCtrl',LoginCtrl)

LoginCtrl.$inject=['$scope','$state','NetCall','Global','GlobalConstants','$ionicLoading'];
function LoginCtrl($scope,$state,NetCall,Global,GlobalConstants,$ionicLoading){
    
$scope.data={};
$scope.data.mobilenumber=Global.getFromLocalStorage(GlobalConstants.ls_mobilenumber)?Global.getFromLocalStorage(GlobalConstants.ls_mobilenumber):"";
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
<<<<<<< HEAD
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
                Global.setInLocalStorage("cno",data.id),
=======
                console.log(JSON.stringify(data));
                Global.setInLocalStorage("cno", data.id);
                Global.setInLocalStorage(GlobalConstants.ls_mobilenumber, $scope.data.mobilenumber);
>>>>>>> c93f7a5dd149dc9aca905bd750173d7aea418efd
                $state.go('dashboard');
                $ionicLoading.hide();
            }else{
                Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                $scope.data={};
                $ionicLoading.hide();
            }
        },
        error:function(data,status,headers,config){
             $ionicLoading.hide();
        },
    });
}





}
