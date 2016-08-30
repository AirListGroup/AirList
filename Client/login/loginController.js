(function() {
  'use strict';

  angular
    .module('login', ['app'])
    .controller('loginController', loginController);

  loginController.$inject = ['$scope', 'auth', '$window'];

  function loginController($scope, auth, $window) {
    $scope.login = login;

    function login() {
      if (!window.localStorage.profile) {
        auth.signin();
      }
    }

  }
})();
