
angular
    .module('lotterynumberconfirm.module')
    .config(function config($stateProvider) {
        $stateProvider

            .state('lotterynumberconfirm', {
                url: "/lotterynumberconfirm",
                templateUrl: "js/lottery/lotterynumberconfirm/lotterynumberconfirm.html",
                controller:"lotterynumberconfirmCtrl",
                params: {
                    LastLoginDate:null
                }
            })
    });