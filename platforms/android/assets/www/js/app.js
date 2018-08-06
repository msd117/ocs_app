angular.module('starter', [
    'ionic',
    'ngCordova',
    'starter.constants',
    'starter.controllers',
    'starter.services',
    'starter.directives',
    
    
    'registration.module',
    'Login.module',
    'complaintbyid.module',
    'viewcomplaint.module',
    'newcomplaint.module',
    'dashboard.module',
    'complaintdetails.module'
])

    .run(['Global', 'GlobalConstants', '$ionicPlatform', '$rootScope', '$document', '$state', '$ionicViewSwitcher', '$ionicHistory', '$ionicPopup', 'NetCall', '$ionicLoading', '$cordovaNetwork','passData',
        function (Global, GlobalConstants, $ionicPlatform, $rootScope, $document, $state, $ionicViewSwitcher, $ionicHistory, $ionicPopup, NetCall, $ionicLoading, $cordovaNetwork,passData) {


            $ionicPlatform.ready(function () {
                
                // Global.setInLocalStorage("cno","0")
              
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);
                }

                if (window.StatusBar) {
                    StatusBar.styleLightContent();
                }

                
                   
                 
                   
                    if (typeof cordova != 'undefined') {
                        var permissions = cordova.plugins.permissions;
                        var list = [
                            permissions.READ_PHONE_STATE,
                            permissions.WRITE_EXTERNAL_STORAGE,
                            permissions.READ_EXTERNAL_STORAGE,
                            permissions.ACCESS_FINE_LOCATION

                        ];
                        permissions.requestPermissions(list, requestSuccess, requestError);

                        var num_permissions = list.length;

                        function requestSuccess() {
                            for (i = 0; i < num_permissions; i++) {
                                permissions.checkPermission(list[i], function (status) {
                                    if (status.hasPermission) {
                                        // Get IP Address added cordova plugin add cordova-plugin-networkinterface
                                        networkinterface.getWiFiIPAddress(function (ip) {
                                            Global.setInLocalStorage("IP", ip);
                                        });
                                        networkinterface.getCarrierIPAddress(function (ip) {
                                            Global.setInLocalStorage("IP", ip);
                                        });
                                    } else {
                                       // Global.showAlert(GlobalConstants.errorAlertHeader, "Please enable permissions to proceed further");
                                    }
                                });
                            }
                        }

                        function requestError() {
                            //console.log("Permissions request error");
                        }
                    }

                    window.addEventListener('native.keyboardshow', function () {
                        document.body.classList.add('keyboard-open');
                    });
                

                //sohel hardcode
              //   var isOnline = $cordovaNetwork.isOnline();

               var isOnline=true;

                 if(isOnline){
                    Global.setOnlineStatus(true);
                 }else{
                     Global.setOnlineStatus(false);
                 }


                 // listen for Online event
                $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                     //$rootScope.isOnline = true;
                     Global.setOnlineStatus(true);
                });
                // listen for Offline event
                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                   // $rootScope.isOnline = false;
                   Global.setOnlineStatus(false);
                });


                $ionicPlatform.registerBackButtonAction(function (event) {
                    if ($state.current.name == "AddAmount" || $state.current.name == "registration" || $state.current.name == "DebitCardLogin") {
                        var confirmPopup = $ionicPopup.confirm({
                            title: 'Exit',
                            template: 'Exit Application, Are you sure. Continue?'
                        });
                        confirmPopup.then(function (res) {
                            if (res) {
                                navigator.app.exitApp();
                            } 
                        });
                    }
                    event.preventDefault();
                }, 100);

                
                
                
                
                //show first screen
                var cno=Global.getFromLocalStorage("cno");
                if(cno && cno.length>0){
                    $state.go("UsernameLogin");
                }else{
                    $state.go("landingpage");
                }
                   
                

            }); //Ionic Platformready


            $rootScope.goto = function (pageName) {
            
                    $state.go(pageName);
                
            }


            $rootScope.logout = function () {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Logout',
                    template: 'Are you sure you want to Logout from Application?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $ionicHistory.clearCache();
                        $ionicHistory.clearHistory();
                        $state.go("UsernameLogin");
                        }
                });
            }
        }
    ])
   


