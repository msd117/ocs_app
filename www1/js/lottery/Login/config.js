
angular
    .module('Login.module')
    .config(function config($stateProvider) {
        $stateProvider
            .state('Login', {
                url: "/Login",
                templateUrl: "js/lottery/Login/Login.html",
                controller:"LoginCtrl",
                cache:false
            })
    })
