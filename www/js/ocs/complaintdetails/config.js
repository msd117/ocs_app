angular
.module('complaintdetails.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('complaintdetails', {
   url: '/complaintdetails',
   templateUrl: 'js/ocs/complaintdetails/complaintdetails.html',
   controller: 'complaintdetails',
   cache:false
 })
  

});