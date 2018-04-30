angular.module('AddAmount.module')
.config(function config($stateProvider){
    $stateProvider
        .state('AddAmount',{
            url:"/AddAmount",
            templateUrl:"js/AddAmount/AddAmount.html",
            controller:"AddAmountCtrl",
            cache:false
        })

})