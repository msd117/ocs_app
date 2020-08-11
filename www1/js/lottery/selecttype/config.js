angular
.module('selecttype.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('selecttype', {
   url: '/selecttype',
   templateUrl: 'js/lottery/selecttype/selecttype.html',
   controller: 'selecttype'
 })
  

});