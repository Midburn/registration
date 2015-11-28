'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the registrationApp - add details to profile after initial registration
 */
angular.module('registrationApp')
  .directive('matchPasswordWith', [function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        var name = scope.detailsForm.password1.$name;
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
  .controller('ProfileCtrl',
  [
    '$scope',
    '$routeParams',
    '$location',
    'lodash',
    function ($scope, $routeParams, $location, _) {
    // handle steps
    $scope._ = _;
    $scope.currentStep = 0;
    $scope.forms = {
      details: {name: 'detailsForm', index: 0},
      burner: {name: 'burnerForm', index: 1},
      skills: {name: 'skillsForm', index: 2},
      terms: {name: 'termsForm', index: 3}
    };

    $scope.getCurrentForm = function () {
      var formCode = $scope._.findKey($scope.forms,
        function (item) {
          if (item.index === $scope.currentStep)
            return true
        }
      );
      return $scope[$scope.forms[formCode].name];
    };

    $scope.nextStep = function () {
      $scope.getCurrentForm().$submitted = true;
      if ($scope.getCurrentForm().$valid)
        $scope.currentStep++;
    };
    $scope.previousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
      }
    };

    // fake signup
    var fakeToken = '111';
    var getRegistrationDetails = function (token) {
      if ($routeParams.registrationToken === fakeToken) {
        return {
          firstName: "first",
          lastName: "last",
          email: "email@domain.com"
        };
      }
      else {
        return false;
      }
    };
    var user = getRegistrationDetails();

    if (user) {
      $scope.user = user;
    }
    else {
      $location.path('missingProfile');
    }

    $scope.update = function (user) {
      console.log("Sending %o to signup API", user);
    };
  }]);
