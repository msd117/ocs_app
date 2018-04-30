angular
.module('newcomplaint.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('newcomplaint', {
   url: '/newcomplaint',
   templateUrl: 'js/ocs/newcomplaint/newcomplaint.html',
   controller: 'newcomplaint'
 })
  

});