angular
.module('viewcomplaint.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('viewcomplaint', {
   url: '/viewcomplaint',
   templateUrl: 'js/ocs/viewcomplaint/viewcomplaint.html',
   controller: 'viewcomplaint',
   cache:false
 })
  

});