angular.module('starter.directives', [])

/* Directive to disable cut, copy, paste in password fields */
.directive('stopccp', function () {
    return {
        scope: {},
        link: function (scope, element) {
            element.on('cut copy paste', function (event) {
                event.preventDefault();
            });
        }
    };
})
.directive('customOnChange', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
})

.directive('dlKeyCode', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            $element.bind("keypress", function (event) {
                var keyCode = event.which || event.keyCode;
                if (keyCode == $attrs.code) {
                    $scope.$apply(function () {
                        $scope.$eval($attrs.dlKeyCode, { $event: event });
                    });
                    event.preventDefault();
                }
            });
        }
    };
})

.directive('focusMe', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.focusMe, function (value) {
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                        scope[attrs.focusMe] = false;
                    },500);
                }
            });
        }
    };
})

.directive('numberonly', function() {
   return {
       require: 'ngModel',
       restrict: 'A',
       link: function(scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function(inputValue) {
               if (inputValue === undefined)
                   return ''
               cleanInputValue = inputValue.toString().replace(/[^0-9]/, '');
               if (cleanInputValue != inputValue) {
                   modelCtrl.$setViewValue(cleanInputValue);
                   modelCtrl.$render();
               }
               return cleanInputValue;
           });
       }
   }
})


  .provider('showErrorsConfig', function () {
      var _showSuccess;
      _showSuccess = false;
      this.showSuccess = function (showSuccess) {
          return _showSuccess = showSuccess;
      };
      this.$get = function () {
          return { showSuccess: _showSuccess };
      };
  })
  .directive('stringToNumber', function () {
      return {
          require: 'ngModel',
          link: function (scope, element, attrs, ngModel) {
              ngModel.$parsers.push(function (value) {
                  return '' + value;
              });
              ngModel.$formatters.push(function (value) {
                  return parseFloat(value, 10);
              });
          }
      };
    })
    .directive('checkdate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMax, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var maxValidator = function (value) {
                   // var max = scope.$eval(attr.ngMax) || Infinity;
                   var max = new Date();
                    if (value && value > max) {
                        ctrl.$setValidity('ngMax', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('ngMax', true);
                        return value;
                    }
                };
    
                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    })

.directive('scrollWatch', function($rootScope) {
  return function(scope, elem, attr) {
    var start = 0;
    var threshold = 150;
    
    elem.bind('scroll', function(e) {
      //e.target for test in browser e.detail for mobile
      if( e.detail.scrollTop - start  > threshold) {
        $rootScope.slideHeader = true;
      } else {
        $rootScope.slideHeader = false;
      }
      //$rootScope.slideHeaderPrevious >= e.target.scrollTop - start ||
      if ( $rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
        $rootScope.slideHeader = false;
      }
      //e.target.scrollTop - start ||
      $rootScope.slideHeaderPrevious =  e.detail.scrollTop - start;
     // $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
      $rootScope.$apply();
    });

  };
})


// take input number only with 2 point of decimal
.directive('validNumber', function() {
       return {
         require: '?ngModel',
         link: function(scope, element, attrs, ngModelCtrl) {
           if(!ngModelCtrl) {
             return;
           }
            ngModelCtrl.$parsers.push(function(val) {
             if (angular.isUndefined(val)) {
                 var val = '';
             }
            
             var clean = val.replace(/[^-0-9\.]/g, '');
             var negativeCheck = clean.split('-');
             var decimalCheck = clean.split('.');
             if(!angular.isUndefined(negativeCheck[1])) {
                 negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                 clean =negativeCheck[0] + '-' + negativeCheck[1];
                 if(negativeCheck[0].length > 0) {
                     clean =negativeCheck[0];
                 }
                
             }
              
             if(!angular.isUndefined(decimalCheck[1])) {
                 decimalCheck[1] = decimalCheck[1].slice(0,2);
                 clean =decimalCheck[0] + '.' + decimalCheck[1];
             }
              if (val !== clean) {
               ngModelCtrl.$setViewValue(clean);
               ngModelCtrl.$render();
             }
             return clean;
           });
            element.bind('keypress', function(event) {
             if(event.keyCode === 32) {
               event.preventDefault();
             }
           });
         }
       };
     })

.directive('nospace', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {

       modelCtrl.$parsers.push(function (inputValue) {

         var transformedInput = inputValue.toLowerCase().replace(/ /g, ''); 

         if (transformedInput!=inputValue) {
           modelCtrl.$setViewValue(transformedInput);
           modelCtrl.$render();
         }         

         return transformedInput;         
       });
     }
   };
})

.directive('capitalize', function($parse) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
           var capitalize = function(inputValue) {
              if (inputValue === undefined) { inputValue = ''; }
              var capitalized = inputValue.toUpperCase();
              if(capitalized !== inputValue) {
                 modelCtrl.$setViewValue(capitalized);
                 modelCtrl.$render();
               }        
               return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
      };
   })


.directive('noSpecialChar', function() {
   return {
       require: 'ngModel',
       restrict: 'A',
       link: function(scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function(inputValue) {
               if (inputValue === undefined)
                   return ''
                //   /[^\w\s_]/gi
                //   /[^A-Z0-9]/gi
               cleanInputValue = inputValue.toString().replace(/[^A-Z0-9]/gi, '');
               if (cleanInputValue != inputValue) {
                   modelCtrl.$setViewValue(cleanInputValue);
                   modelCtrl.$render();
               }
               return cleanInputValue;
           });
       }
   }
});
