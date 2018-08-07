angular
.module('viewcomplaintnearme.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('viewcomplaintnearme', {
   url: '/viewcomplaintnearme',
   templateUrl: 'js/ocs/viewcomplaintnearme/viewcomplaintnearme.html',
   controller: 'viewcomplaintnearme',
   cache:false
 })
  

});