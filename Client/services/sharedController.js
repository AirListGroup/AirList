(function() {
  'use strict';

  angular.module('main', ['app', 'userAccount', 'login'])
    .controller('SharedController', SharedController);

  SharedController.$inject = ['$scope', '$http', '$window', 'Shared'];

  function SharedController($scope, $http, $window, Shared) {
    //this gets the users current location within the app
    $scope.env = $window.location.href.split('#');

    //this asks the user to provide their location. If they agree, the users longitude and latitude will be stored. This will be used later as the position when the user adds an item from the userAccount page.
    navigator.geolocation.getCurrentPosition(function(position) {
      $scope.position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });

    $scope.options = [{
      category: "All Departments"
    }, {
      category: "Books"
    }, {
      category: "Cars"
    }, {
      category: "Electronics"
    }, {
      category: "Furniture"
    }, {
      category: "Jewelry"
    }, {
      category: "Sporting Goods"
    }, {
      category: "Toys+Games"
    }];

    $scope.initMap = initMap;
    $scope.refresh = refresh;
    $scope.queryUpdater = queryUpdater;
    $scope.search = search;
    $scope.yourListings = yourListings;
    $scope.rent = rent;
    $scope.sendEmail = sendEmail;
    $scope.logout = logout;

    function refreshUserListings() {
      $http({
        method: 'GET',
        url: '/listings'
      }).success(function(res) {
        $scope.yourItems = res;
      });
    }

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

    function refresh() {
      Shared.refreshed().then(function(res) {
        $scope.lists = res.data;
      });
    }

    function queryUpdater() {
      Shared.refreshed().then(function(data) {
        $scope.query = data
      });

    }

    function search(category) {
      if (category === "All Departments") {
        $http({
          method: 'GET',
          url: '/listings'
        }).success(function(res) {
          $scope.query = res;
        });
      } else {
        $http({
          method: 'GET',
          url: '/listings/category/' + category
        }).success(function(res) {
          $scope.query = res;
        });
      }
    }

    function yourListings() {
      $scope.email = JSON.parse(window.localStorage.profile).email;
      refreshUserListings();
    }

    function rent(item) {
      item.rentable = false;
      item.renter = JSON.parse(window.localStorage.profile).email;
      $http({
        method: 'PUT',
        url: '/listings/' + item._id,
        data: item
      });
    }

    function sendEmail(item) {
      var subj = "Inquiry regarding " + item.name;
      var message = "Dear item owner,"
      $window.open("mailto:" + item.email + "?subject=" + subj + "&body=" + message, "_self");
    }

    function logout() {
      window.localStorage.clear();
      $window.location.href = '/'
    }


  }

})();
