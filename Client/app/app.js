(function() {
  'use strict';

  angular
    .module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute', 'userAccount', 'login', 'home', 'services', 'main'])
    .config(myAppConfig);

  myAppConfig.$inject = ['$routeProvider', 'authProvider'];

  function myAppConfig($routeProvider, authProvider) {
    authProvider.init({
      domain: 'jeffreylamwork.auth0.com',
      clientID: '7a1aqBcXrXZ7VUCJibImgkDLQF105C2I',
      loginUrl: '/login'
    });


    $routeProvider
      .when('/', {
        controller: 'loginController',
        templateUrl: 'landingPage/index.html',
        requiresLogin: false
      })
      .when('/home', {
        controller: 'homeController',
        templateUrl: 'home/home.html',
        requiresLogin: false
      })
      .when('/userAccount', {
        controller: 'userAccountController',
        templateUrl: 'userAccount/userAccount.html',
        requiresLogin: true
      })

    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
      // Successfully log in
      // Access to user profile and token
      profilePromise.then(function(profile) {
        // profile
        store.set('profile', profile);
        store.set('token', idToken);
        email = profile.email;

      });
      $location.url('/home');
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function($location) {
      // If anything goes wrong
      console.log("Login Failure foo!")
      $location.url('#/');
    });
  }

})();
