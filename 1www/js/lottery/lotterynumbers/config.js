
angular
    .module('lotterynumbers.module')
    .config(function config($stateProvider) {
        $stateProvider

            .state('lotterynumbers', {
                url: "/lotterynumbers",
                templateUrl: "js/lottery/lotterynumbers/lotterynumbers.html",
                controller:"lotterynumberssCtrl",
                params: {
                    LastLoginDate:null
                }
            })
    });