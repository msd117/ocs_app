//'use strict';

angular.module('starter.services', [])
  .factory('NetCall', ['$http', '$ionicViewSwitcher', '$log', '$q', '$state', '$window', 'Global', 'GlobalConstants', '$filter', '$ionicLoading', netCallService])
  .factory('Global', ['$window', '$ionicViewSwitcher', '$ionicHistory', '$ionicLoading', '$ionicPopup', 'GlobalConstants', '$filter', '$rootScope', '$state', globalService])
  .factory('passData', function () {
    var data = {};
    return {
      saveData: function (values) {
        data = values;
      },
      getData: function () {
        return data;
      }
    };
  })

function netCallService($http, $ionicViewSwitcher, $log, $q, $state, $window, Global, GlobalConstants, $ionicLoading) {
  var service = {
    httpGET: getService,
    httpPOST: postService,
  };

  return service;

  /**
   * Adds paramters to Request Header.
   *
   * @param {Object} options
   */
  function addRequestHeaderParameters(options) {
    $http.defaults.headers.common['timezone'] = moment.tz.guess(); //'Asia/Kolkata';
  }

  /**
   * Makes an http GET call using given parameters.
   *
   * @param {Object} options
   */
  function getService(options) {
    var deferred = $q.defer();
    var success = options.success;
    var error = options.error;
    var url = options.url;
    if (!options.doNotSetResponseType) {
      url = options.url; // + "/" + GlobalConstants.responseType;
    }
    addRequestHeaderParameters(options);
    $http.get(url, {
        timeout: GlobalConstants.responseTimeOut
      })
      .success(function (data, status, headers, config) {
        deferred.resolve(success(data, status, headers, config));
      }).error(function (data, status, headers, config) {
        deferred.reject(data);
        Global.showAlert("Error", "Due to some technical problems we are unable to process your request. Please try later.");
        error(data, status, headers, config);
        $log.error(data, status, headers, config);
      });
    return deferred.promise;
  }


  /**
   * Makes an http POST call using given parameters.
   *
   * @param {Object} options
   */
  function postService(options) {

    if (Global.getOnlineStatus()) {



      var success = options.success;
      var error = options.error;
      var url = options.url;
      if (!options.doNotSetResponseType) {
        url = options.url; // + "/" + GlobalConstants.responseType;
      }

      addRequestHeaderParameters(options);

      var initInjector = angular.injector(["ng"]);
      var $q = initInjector.get("$q");
      var deferred = $q.defer();

      $http.post(url, options.data, {
          timeout: GlobalConstants.responseTimeOut
        })
        .success(function (data, status, headers, config) {
          deferred.resolve(success(data, status, headers, config));
        }).error(function (data, status, headers, config) {
          deferred.reject(data);
          Global.showAlert("Error", "Due to some technical problems we are unable to process your request. Please try later.");
          error(data, status, headers, config);
          $log.error(data, status, headers, config);

        });
      return deferred.promise;


    } else {
      Global.hideLoading();
      Global.showAlert('', "No Network Connection.");
    }


  }

}



function globalService($window, $ionicViewSwitcher, $ionicHistory, $ionicLoading, $ionicPopup, GlobalConstants, $filter, $rootScope, $state) {
  var isOnline = "";
  var service = {
    getObject: getObject,
    setObject: setObject,
    clearLocalStorage: clear,
    resetLocalStorage: reset,
    getFromLocalStorage: getFromLocalStorage,
    setInLocalStorage: setInLocalStorage,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showConfirmation: showConfirmation,
    showAlert: showAlert,
    encryptString: encryptString,
    decryptString: decryptString,
    generateUniqueId: generateUniqueId,
    encryptJson: encryptJson,
    getOnlineStatus: getOnlineStatus,
    setOnlineStatus: setOnlineStatus,
    showLoadingTimer: showLoadingTimer,
    selectimagetype: selectimagetype,

  };

  return service;

  /**
   * Makes an entry in localStorage based on the key/value pair provided.
   *
   * @param {String} key
   * @param {String} value
   */

  /**
   * Retrieves an string value from localStorage based on the key provided.
   * Returns a blank string, if specified key is not available
   *
   * @param {String} key
   */

  /**
   * Makes an entry in localStorage based on the key/value pair provided.
   *
   * @param {String} key
   * @param {String} value
   */


  function getOnlineStatus() {
    return isOnline;
  }

  function setOnlineStatus(newOnlineStatus) {
    isOnline = newOnlineStatus;
  }


  function setInLocalStorage(key, value) {
    if (ionic.Platform.platform() == 'ios') {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.setItem(key, encryptString(value));
    }
  }

  /**
   * Retrieves an string value from localStorage based on the key provided.
   * Returns a blank string, if specified key is not available
   *
   * @param {String} key
   */
  function getFromLocalStorage(key) {
    // return $window.localStorage.getItem(key) || "";
    if (ionic.Platform.platform() == 'ios') {
      if (window.localStorage.getItem(key) == null) {
        return "";
      } else {
        return window.localStorage.getItem(key);
      }
    } else {
      if (window.localStorage.getItem(key) == null) {
        return "";
      } else {
        return decryptString(window.localStorage.getItem(key));
      }
    }
  }
  /**
   * Makes an entry in localStorage based on the key/value pair provided.
   *
   * @param {String} key
   * @param {Object} value
   */
  function setObject(key, value) {
    // var encryptedJson=encryptJson(value);
    if (ionic.Platform.platform() == 'ios') {
      if (value && value.length > 0) {
        window.localStorage.setItem(key, value);
      }
    } else {
      var encryptedJson = encryptJson(value);
      if (encryptedJson && encryptedJson.length > 0) {
        window.localStorage.setItem(key, encryptedJson);
      }
    }


  }

  /**
   * Retrieves a json object from localStorage based on the key provided.
   * Returns an empty json, if specified key is not available
   *
   * @param {String} key
   */
  function getObject(key) {
    if (ionic.Platform.platform() == 'ios') {
      if (window.localStorage.getItem(key) == null) {
        return [];
      } else {
        return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : [];
      }
    } else {
      if (window.localStorage.getItem(key) == null) {
        return [];
      } else {
        return window.localStorage.getItem(key) ? JSON.parse(decryptString(window.localStorage.getItem(key))) : [];
      }
    }
  }

  /**
   * Removes all key/value pairs from localStorage
   *
   */
  function clear() {

  }

  /**
   * Removes all key/value pairs from localStorage on reset
   *
   */
  function reset() {

  }


  function showLoadingTimer() {
    $ionicLoading.show({
      templateUrl: 'templates/loading.html',
      duration: 30000,
      noBackdrop: true
    });
    $rootScope.$broadcast('showLoading', true);
  }

  function showLoading() {
    $ionicLoading.show({
      template: '<img src="img/logo.gif" width="100" height="100"/>',

    });
    $rootScope.$broadcast('showLoading', true);
  }

  function hideLoading() {
    $ionicLoading.hide();
  }

  function showConfirmation(headerTitle, confirmMessage, confirmCallback, cancelCallback, confirmBtntext, cancelBtnText) {
    if (!confirmBtntext) {
      confirmBtntext = "OK";
    }
    if (!cancelBtnText) {
      cancelBtnText = "Cancel";
    }
    var confirmPopup = $ionicPopup.confirm({
      title: headerTitle,
      template: confirmMessage,
      cancelText: '<strong>' + cancelBtnText + '</strong>',
      okText: confirmBtntext
    });

    confirmPopup.then(function (res) {
      if (res) {
        if (confirmCallback) {
          confirmCallback();
        }
      } else {
        if (cancelCallback) {
          cancelCallback();
        }
      }
    });
    $rootScope.isGenericPopup = confirmPopup;

  }

  function showAlert(headerTitle, alertMessage, callback) {
    var popup = $ionicPopup.alert({
      title: '<strong>' + headerTitle + '</strong>',
      content: alertMessage
    }).then(function (e) {
      if (callback) {
        callback();
      }
    });
  }


  function encryptJson(textToEncrypt) {
    var encrypted = "";
    var key = CryptoJS.enc.Hex.parse("50524f442354435340616c6232303133");
    encrypted = CryptoJS.AES.encrypt(JSON.stringify(textToEncrypt), key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: key,
    });
    return encrypted.toString();

  }


  function encryptString(textToEncrypt) {
    var encrypted = "";
    var key = CryptoJS.enc.Hex.parse("50524f442354435340616c6232303133");
    encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: key,
    });
    return encrypted.toString();

  }

  function decryptString(textToDecrypt) {
    var key = CryptoJS.enc.Hex.parse("50524f442354435340616c6232303133");
    var decryptedText = CryptoJS.AES.decrypt(textToDecrypt, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: key,
    });
    return decryptedText.toString(CryptoJS.enc.Utf8);
  }



  function generateUniqueId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 17; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function selectimagetype($scope, headerTitle, confirmCallback, cancelCallback) {
    var CustomTemplate =
      '<div id="loginlabel" name="loginlabel" class="item item-text-wrap globalfont labelNoBorder Change_profile_label">' +
      '<h2">' + headerTitle + '</h2>' +
      '</div>' +
      '<div id="blanklabel " name="blanklabel " class="row item item-text-wrap globalfont label labelNoBorder ocs_ComplaintImage_div">' +
      '<div ng-click="onCameraClick(\'Camera\')" class="col col-33"><img src="img/camera_photo.png" class="ocs_ComplaintImage_div_icon" ><p class="selectimagetypelabel">Camera</p></div>' +
      '<div ng-click="onCameraClick(\'Gallery\')" class="col col-33"><img src="img/gallery_photo.png" class="ocs_ComplaintImage_div_icon" ><p class="selectimagetypelabel">Gallery</p></div>' +
      '<div ng-click="onCameraClick(\'NoProfile\')" class="col col-33 "><img src="img/No_image2.png" class="ocs_ComplaintImage_div_icon" ><p class="selectimagetypelabel">Noimage</p></div>' +

      '</div>'

    $scope.confirmPopup = $ionicPopup.alert({
      template: CustomTemplate,
      scope: $scope,
      cssClass: 'selectimagetype-popup', // Add
      cancelText: "Cancel", // String (default: 'Cancel'). The text of the Cancel button.
      okText: "ok", // String (default: 'OK'). The text of the OK button.
    });

    $scope.confirmPopup.then(function (res) {
      if (res) {
        if (confirmCallback) confirmCallback();
      } else {
        if (cancelCallback) cancelCallback();
      }
    });
    // IonicClosePopupService.register($scope.confirmPopup);
  }

}