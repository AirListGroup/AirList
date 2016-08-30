(function() {
  'use strict';

  angular
    .module('services')
    .factory('Shared', Shared);

  Shared.$inject = ['$http'];

  function Shared($http) {

    var service = {
      refreshed: refreshed
    }

    return service;

    function refreshed() {
      return $http.get('/listings');
    };
  }

})();
