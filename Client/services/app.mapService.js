(function() {
  'use strict';

  angular.module('services', ['app'])
    .factory('mapService', mapService);

  mapService.$inject = ['$scope', '$window'];

  function mapService($scope, $window) {
    $scope.initMap = initMap;
    //this gets the users current location within the app
    $scope.env = $window.location.href.split('#');

    //this asks the user to provide their location. If they agree, the users longitude and latitude will be stored. This will be used later as the position when the user adds an item from the userAccount page.
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });

    function initMap(entry, index) {
      if (entry.latitude && entry.longitude) {
        var map = new google.maps.Map(document.getElementById('listentry-' + index), {
          center: {
            lat: entry.latitude,
            lng: entry.longitude
          },
          zoom: 12
        });
      }
    }
  }
})();
