
angular
    .module('dashboard.module')
    .config(function config($stateProvider) {
        $stateProvider

            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "js/lottery/dashboard/dashboard.html",
                controller:"dashboardCtrl",
                params: {
                    LastLoginDate:null
                }
            })
    });