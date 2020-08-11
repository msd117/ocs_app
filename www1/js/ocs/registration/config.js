angular.module('registration.module')
    .config(function config($stateProvider){
        $stateProvider.state('landingpage',{
            url:"/landingpage",
            templateUrl:"js/ocs/registration/landingpage.html",
            controller:"registrationCtrl"
        })
    })
    .config(function config($stateProvider){
        $stateProvider.state('RegistrationForm',{
            url:"/RegistrationForm",
            templateUrl:"js/ocs/registration/RegistrationForm.html",
            controller:"registrationCtrl"
        })
    });