(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  runBlock.$inject = ['$rootScope', 'auth', 'store', 'jwtHelper', '$location'];

  function runBlock($rootScope, auth, store, jwtHelper, $location) {
    // Listen to a location change event
    $rootScope.$on('$locationChangeStart', function() {
      // Grab the user's token
      var token = store.get('token');
      // Check if token was actually stored
      if (token) {
        // Check if token is yet to expire
        if (!jwtHelper.isTokenExpired(token)) {
          // Check if the user is not authenticated
          if (!auth.isAuthenticated) {
            // Re-authenticate with the user's profile
            // Calls authProvider.on('authenticated')
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Use the refresh token to get a new idToken
          auth.refreshIdToken(token);
        }
      }
    });
  }
})();
