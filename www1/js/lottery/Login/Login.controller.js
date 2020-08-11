angular.module('Login.module',[])
.controller('LoginCtrl',LoginCtrl)

LoginCtrl.$inject=['$scope','$state','NetCall','Global','GlobalConstants','$ionicLoading','passData'];
function LoginCtrl($scope,$state,NetCall,Global,GlobalConstants,$ionicLoading,passData){
    
$scope.data={};

$scope.$on("$ionicView.beforeEnter", function(scopes, states) {
    var username=Global.getFromLocalStorage(GlobalConstants.ls_UserName);
    var password=Global.getFromLocalStorage(GlobalConstants.ls_Password);
    if(username.length>0){
        scopes.currentScope.data.username=username;
        scopes.currentScope.data.password=password;
    }
});

$scope.UsernameLogin=function(){
    Global.showLoading();
    Global.setInLocalStorage(GlobalConstants.ls_UserName, $scope.data.username);
    Global.setInLocalStorage(GlobalConstants.ls_Password, $scope.data.password);
    // $state.go('dashboard');
    // $ionicLoading.hide();
    // var jsonData={
    //     "Username":$scope.data.username,
                
    //     "Password":$scope.data.password,
    //     "MobileNo":"85898955"

        
    // };
     var jsonData={
        "UserID":"3",
        "TotalAmount":"23",
        "LotteryNumbers":[{"Number":"25X98","Amount":"23"}]
    };
    var stingedformat = JSON.stringify(jsonData);
    // var URL=GlobalConstants.loginURL;
    var URL=GlobalConstants.lotterytype;
    var URL=GlobalConstants.SubmitlotteryNo;
    
    
    
    
    console.log(JSON.stringify(jsonData));
    NetCall.httpPOST({
        url:URL,
        data:{"JsonData":stingedformat},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:function(data,status,headers,config){
            console.log(data.d);
        // var result = JSON.parse(data.toString(CryptoJS.enc.Utf8));
                    var serverResponse = JSON.parse(data.d);

            // result=JSON.parse(data);
            if(serverResponse.SUCCESS=="1"){
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));


                var dynamicList = passData.getData();
                        dynamicList.lotterytype=serverResponse.data;
                        passData.saveData(dynamicList);
                $state.go('selecttype');
                $ionicLoading.hide();
            }else{
                // Global.showAlert(GlobalConstants.ErrorHeading,JSON.stringify(data));
                // $scope.data.mobilenumber="";
                // $scope.data.pin="";
                $ionicLoading.hide();
            }
        },
        error:function(data,status,headers,config){
             $ionicLoading.hide();
        },
    });
}





}
