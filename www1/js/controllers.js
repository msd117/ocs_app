angular.module('starter.controllers', [])
    .controller('UserController', function ($scope, $state, $http, $ionicLoading, GlobalConstants, Global, NetCall, $cordovaSms,$rootScope) {
       // $rootScope.showFooterOption=false;
       var options = {
        enableHighAccuracy: true
    };

navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(JSON.stringify($scope.position));                  
    }, 
    function(error) {                    
        alert('Unable to get location: ' + error.message);
    }, options);

// var x = document.getElementById("demo");
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude; 
// }
    });