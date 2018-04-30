
angular
    .module('Login.module')
    .config(function config($stateProvider) {
        $stateProvider
            .state('Login', {
                url: "/Login",
                templateUrl: "js/ocs/Login/Login.html",
                controller:"LoginCtrl",
                cache:false
            })
    })
    .config(function config($stateProvider) {
        $stateProvider
            .state('UsernameLogin', {
                url: "/Login",
                templateUrl: "js/ocs/Login/UsernameLogin.html",
                controller:"LoginCtrl",
                cache:false
            })
    });