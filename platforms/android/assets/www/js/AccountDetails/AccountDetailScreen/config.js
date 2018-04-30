
angular
    .module('AccountDetailScreen.module')
    .config(function config($stateProvider) {
        $stateProvider
            //.state('homemenu.AccountDetailScreen', {
            .state('AccountDetailScreen', {  
                url: "/AccountDetailScreen",
                templateUrl: "js/AccountDetails/AccountDetailScreen/AccountDetailScreen.html",
                controller: 'AccountDetailScreenCtrl',
                cache:false
            })
    });