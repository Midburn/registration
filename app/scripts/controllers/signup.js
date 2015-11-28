'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the registrationApp - iniital sign up
 */
angular.module('registrationApp')
  .directive('matchPasswordWith', [function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        var name = scope.form.password1.$name;
        var firstPassword = $("[name=" + name +"]");
        element.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = element.val()===firstPassword.val();
            ctrl.$setValidity('passwordsMatch', v);
          });
        });
      }
    };
  }])
  .controller('SignupCtrl', ['$scope', function ($scope) {
    $scope.user = {};
    $scope.update = function (user) {
      console.log("Sending %o to signup API", user);
    }
  }]);
