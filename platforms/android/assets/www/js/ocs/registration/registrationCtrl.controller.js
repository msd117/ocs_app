angular.module('registration.module',[])
    .controller('registrationCtrl',registrationCtrl)

    registrationCtrl.$inject=['$scope','$state','NetCall','Global','GlobalConstants','$ionicLoading'];
 function registrationCtrl($scope,$state,NetCall,Global,GlobalConstants,$ionicLoading){

    $scope.data={};
    $scope.data.name="sohel"
    $scope.data.emailid="sohel@hotmail.com"
    $scope.data.mobilenumber="9126457832"
    $scope.RegisterUser=function(){
        $state.go('RegistrationForm');
    }
    $scope.login=function(){
        $state.go('UsernameLogin');
    }
    $scope.register=function(){
        Global.showLoading();
        var jsondata={
            "name":$scope.data.name,
            "emailid":$scope.data.emailid,
            "mobilenumber":$scope.data.mobilenumber,
            "PIN":$scope.data.PIN
        };
        
        var URL=GlobalConstants.registration;
        console.log(JSON.stringify(jsondata));
        NetCall.httpPOST({
            url:URL,
            data:{'request':jsondata},
            success:function(data,status,headers,config){
                console.log(JSON.stringify(data));
                if(data.SUCCESS=="1"){
                    Global.setInLocalStorage("cno", data.cno);
                    Global.showAlert(GlobalConstants.infoAlertHeader,data.message);
                    $state.go('Login');
                    $ionicLoading.hide();
                }else  if(data.SUCCESS=="1001"){
                    $ionicLoading.hide();
                    $scope.data={};
                    $state.go('UsernameLogin');
                    Global.showAlert(GlobalConstants.errorAlertHeader,data.message);           
                }else{
                    $ionicLoading.hide();
                    $scope.data={};
                    Global.showAlert(GlobalConstants.errorAlertHeader,data.message);                    
                }
            },
            error:function(data,status,headers,config){
                 $ionicLoading.hide();
            },
        });
       
    }
 }
