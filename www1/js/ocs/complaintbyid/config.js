angular
.module('complaintbyid.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('complaintbyid', {
      url: '/complaintbyid',
      templateUrl: 'js/ocs/complaintbyid/complaintbyid.html',
      controller: 'complaintbyid',
      cache:false,
      params:{
        item:null
      }
 })
  

});