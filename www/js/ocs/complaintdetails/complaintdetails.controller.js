angular.module('complaintdetails.module',[])
.controller('complaintdetails',complaintdetails);
 
complaintdetails.$inject = ['$scope','$ionicPlatform', '$rootScope', '$interval', '$timeout', '$ionicPopup', '$state', 'NetCall', 'Global', 'GlobalConstants','passData',"$ionicLoading"];
function complaintdetails($scope, $ionicPlatform, $rootScope, $interval, $timeout, $ionicPopup, $state, NetCall, Global, GlobalConstants,passData,$ionicLoading) {
    $scope.data={};
   
      
    var dynamicList = passData.getData();

    $scope.data.selectedcomplaint=dynamicList.selectedcomplaint;
    getMapLocation();
    
    var Latitude = "";
    var Longitude = "";
  
    // Get geo coordinates
    
    function getMapLocation() {
    
        navigator.geolocation.getCurrentPosition( onMapSuccess, onMapError, { enableHighAccuracy: true });
    }
    
    // Success callback for get geo coordinates
    
    function onMapSuccess (position) {
    
        Latitude = position.coords.latitude;
        Longitude = position.coords.longitude;
    
        getMap(Latitude, Longitude);
    
    }
    
    // Get map by using coordinates
    
    function getMap(latitude, longitude) {
    
        var mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    
        map = new google.maps.Map
        (document.getElementById("map"), mapOptions);
    
    
        var latLong = new google.maps.LatLng(latitude, longitude);
    
        var marker = new google.maps.Marker({
            position: latLong
        });
    
        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());

        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocodeLatLng(geocoder, map, infowindow);
    }
    
    // Success callback for watching your changing position
    
    var onMapWatchSuccess = function (position) {
    
        var updatedLatitude = position.coords.latitude;
        var updatedLongitude = position.coords.longitude;
    
        if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
    
            Latitude = updatedLatitude;
            Longitude = updatedLongitude;
    
            getMap(updatedLatitude, updatedLongitude);
        }
    }
    
    // Error callback
    
    function onMapError(error) {
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    // Watch your changing position
    
    function watchMapPosition() {
    
        return navigator.geolocation.watchPosition
        (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    }

    function geocodeLatLng(geocoder, map, infowindow) {
       
        // var input = late+','+long;
        //var latlngStr = input.split(',', 2);
        var latlng = { lat: parseFloat(Latitude), lng: parseFloat(Longitude) };
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    map.setZoom(17);
                    var marker = new google.maps.Marker({
                        position: latlng,
                        center: latlng,
                        map: map
                    });
                    infowindow.setContent(results[1].formatted_address);
                    infowindow.open(map, marker);
                    // console.log(JSON.stringify(results[1]));


                    var arrAddress = results[1].address_components;
                    // iterate through address_component array
                       for(i=0;i<arrAddress.length;i++){
                            if (arrAddress[i].types[0] == "locality") {// locality type
                                $scope.city=arrAddress[i].long_name;
                                console.log(arrAddress[i].long_name); // here's your town name
                            }
                       }
                    // console.log(results);
                    $scope.data.address=results[1].formatted_address;
                    // Global.showAlert(GlobalConstants.errorAlertHeader, results[1].formatted_address); 
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    $scope.opentemp=function(){
        Global.selectimagetype($scope, "Select Image type");
    }
    function toDataUrl(src, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL('image/jpeg');
            callback(dataURL);
        };
        img.src = src;
        }

    $scope.onCameraClick=function(param){
        switch(param){
            case "Camera":
                var CameraOptions = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.CAMERA,correctOrientation: true, allowEdit: false, encodingType: Camera.EncodingType.JPEG }
                function cameraError() { $scope.confirmPopup.close(); }
                function cameraSuccess(imageUrl) {
                    plugins.crop(function success (croppedimage) {
                            toDataUrl(croppedimage, function(base64Img) {
                                $scope.selectedimage=base64Img;
                                $scope.confirmPopup.close();
                                $scope.$apply();
                            },
                            function(error){
                                console.log(error);
                            });
                        }, function fail () {
                        }, imageUrl, { quality: 100 })
                    $scope.confirmPopup.close();
                }
                navigator.camera.getPicture(cameraSuccess, cameraError, CameraOptions);
            break;
            case "Gallery":
                var galleryOptions = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.PHOTOLIBRARY,correctOrientation: true, allowEdit: false, encodingType: Camera.EncodingType.JPEG }
                function galleryError() { $scope.confirmPopup.close(); }
                function gallerySuccess(imageUrl) {
                    plugins.crop(function success (croppedimage) {
                        toDataUrl(croppedimage, function(base64Img) {
                                    $scope.selectedimage=base64Img;
                                    $scope.confirmPopup.close();
                                    $scope.$apply();
                                },
                                function(error){
                                    console.log(error);
                                });
                        }, function fail () {
                        }, imageUrl, { quality: 100 })
                    $scope.confirmPopup.close();
                }
                navigator.camera.getPicture(gallerySuccess, galleryError, galleryOptions);
            break;
            case "NoProfile":
                $scope.selectedimage="";
                $scope.confirmPopup.close();
            break;
        }
    }  

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

$scope.submit= function(){
    if($scope.selectedimage && $scope.selectedimage.length>0){
        if( $scope.city=="Aurangabad"){
            Global.showLoading()
            var jsondata = {
                "date": formatDate(new Date()),//$scope.data.date,
                "image":$scope.selectedimage,
                "lat":Latitude,
                "lang":Longitude,
                "address":$scope.data.address,
                "complainttype":$scope.data.selectedcomplaint,
                "description":$scope.data.description,
                "submittedby":Global.getFromLocalStorage("cno"),
                };
            //    var encryptedData = Global.encryptJson(jsondata);
            //    console.log(JSON.stringify(jsondata));
            var URL = GlobalConstants.newcomplaint;
            NetCall.httpPOST({
                url: URL,
                data: {
                    'request': jsondata
                },
                success: function (data, status, headers, config) {
                    //    var decryptedData = Global.decryptString(data.response.toString().replace(/\n/g, ""));
                    //    var obj = JSON.parse(decryptedData);
                    console.log(JSON.stringify(data));
                    $ionicLoading.hide();
                    if (data.SUCCESS == 1) {
                        Global.showAlert(GlobalConstants.infoAlertHeader, data.message);
                        $state.go("dashboard");
                        // $state.go("Acknowledgement",{successMsg:obj.message});
                    } else {
                        
                        Global.showAlert(GlobalConstants.errorAlertHeader, data.message);
                        
                    }
                },
                error: function (data, status, headers, config) {
                    $ionicLoading.hide();
                },
            }); // End requestcall
        }else{
            Global.showAlert(GlobalConstants.errorAlertHeader, "This application only register complaints for Aurangabad city");
        }
    }else{
        Global.showAlert(GlobalConstants.errorAlertHeader, "Please select Image for Complaint");
    }
}

}
