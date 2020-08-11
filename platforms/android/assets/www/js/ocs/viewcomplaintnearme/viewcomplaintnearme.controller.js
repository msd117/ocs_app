angular.module('viewcomplaintnearme.module',[])
.controller('viewcomplaintnearme',viewcomplaintnearme);
 
viewcomplaintnearme.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData',"$ionicLoading"];
function viewcomplaintnearme($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData,$ionicLoading) {
    $scope.data={};

    $scope.$on("$ionicView.beforeEnter", function(scopes, states) {
        var dynamicList = passData.getData();
        $scope.data.complaints=dynamicList.viewcomplaintnearme;
        var map;
        function initMap(Latitude, Longitude) {
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: new google.maps.LatLng(Latitude, Longitude),
            mapTypeId: 'roadmap'
          });
          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
          var icons = {
            parking: {
              name: 'Parking',
              icon: iconBase + 'parking_lot_maps.png'
            },
            library: {
              name: 'Library',
              icon: iconBase + 'library_maps.png'
            },
            complaint: {
              name: 'complaint',
              icon: iconBase + 'info-i_maps.png'
            }
          };
          var infowindow = new google.maps.InfoWindow();
          
          for (i=0;i<$scope.data.complaints.length;i++){
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(parseFloat($scope.data.complaints[i].lat), parseFloat($scope.data.complaints[i].lang)),
              icon: icons['complaint'].icon,
              map: map
            });
              // Add info window to marker    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<div class="info_content">' +
                '<h3>'+$scope.data.complaints[i].complainttype+'</h3>' +
                '<p onClick="onListItemClick('+$scope.data.complaints[i].id+')">View Details</p>' + 
                '</div>');
                infowindow.open(map, marker);
              }
            })(marker, i));
          }

          
          var legend = document.getElementById('legend');
          for (var key in icons) {
            var type = icons[key];
            var name = type.name;
            var icon = type.icon;
            var div = document.createElement('div');
            div.innerHTML = '<img src="' + icon + '"> ' + name;
            legend.appendChild(div);
          }
          map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
        }

        navigator.geolocation.getCurrentPosition( onMapSuccess, onMapError, { enableHighAccuracy: true });
        function onMapSuccess (position) {
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;
            initMap(Latitude, Longitude);
        }
        function onMapError(error) {
            console.log('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
        }
      
    });

    window.onListItemClick =function(id){
      // $state.go("complaintbyid",{id:id});
      Global.showLoading()
      var jsondata = {
          "selectedid":id,
          };
      var URL = GlobalConstants.complaintbyid;
      NetCall.httpPOST({
          url: URL,
          data: {
              'request': jsondata
          },
          success: function (data, status, headers, config) {
              // console.log(JSON.stringify(data));
              $ionicLoading.hide();
              if (data.SUCCESS == 1) {
                  // console.log(data);
                  $state.go("complaintbyid",{item:data.records[0]});   
              } else {
                  Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
              }
          },
          error: function (data, status, headers, config) {
              $ionicLoading.hide();
          },
      }); // End requestcall
    }


  
}
