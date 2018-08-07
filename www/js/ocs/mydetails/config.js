angular
.module('mydetails.module')
.config(function config($stateProvider) {
    $stateProvider

    .state('mydetails', {
      url: '/mydetails',
      templateUrl: 'js/ocs/mydetails/mydetails.html',
      controller: 'mydetails',
      cache:false,
      params:{
        item:null
      }
      
 })
  

});