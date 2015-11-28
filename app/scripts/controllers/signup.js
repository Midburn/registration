'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the registrationApp - iniital sign up
 */
angular.module('registrationApp')
  .controller('SignupCtrl', ['$scope', function ($scope) {
    $scope.user = {};
    $scope.update = function (user) {
      console.log("Sending %o to signup API", user);
    }
  }]);
