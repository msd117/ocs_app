
angular
    .module('UserAccountDetails.module')
    .config(function config($stateProvider) {
        $stateProvider
            .state('UserAccountDetails', {
                url: "/UserAccountDetails",
                templateUrl: "js/AccountDetails/UserAccountDetails/UserAccountDetails.html",
                controller: 'UserAccountDetailsCtrl',
                cache:false
                
            })
    });