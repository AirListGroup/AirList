(function() {
  'use strict';

  angular.module('userAccount', ['app'])
    .controller('userAccountController', userAccountController);

  userAccountController.$inject = ['$scope', '$http', 'Shared'];

  function userAccountController($scope, $http, Shared) {
    $scope.addCategory = [{
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

    $scope.remove = remove;
    $scope.returnItem = returnItem;
    $scope.addItem = addItem;
    $scope.goToUserAcc = goToUserAcc;

    //this removes an item from the database. Only users can delete their own items. Can be placed in the userAccountController instead


    function remove(item) {
      $http.delete('/listings/' + item._id).success(function(res) {
        refreshUserListings();
      });
    };

    //reverse of above, it changes status to true, and deletes the 'renter' prop out of the item field. Then it refreshes the userListings. Can be placed in the userAccountController instead.
    function returnItem(item) {
      item.rentable = true;
      delete item.renter;
      var newItem = item;
      $http({
        method: 'PUT',
        url: '/listings/' + item._id,
        data: newItem
      }).then(refreshUserListings);
    };

    //adds a post to the database, using the person's username grabbed from localStorage. Can be placed in the userAccountController instead
    function addItem(post) {
      post.email = JSON.parse(window.localStorage.profile).email;
      if ($scope.position && $scope.position.lng && $scope.position.lat) {
        post.longitude = $scope.position.lng;
        post.latitude = $scope.position.lat;
      }
      $http({
        method: 'POST',
        url: '/listings',
        data: post
      }).then(refreshUserListings);
    };

    function goToUserAcc() {
      $window.location.href = $window.location.href + 'userAccount'
    }

    // /again, similar to refresh above, but causes unknown bug when refactor is tried. Can be placed in a shared factory instead of here.
    var refreshUserListings = function() {
      $http({
        method: 'GET',
        url: '/listings'
      }).success(function(res) {
        $scope.yourItems = res;
      });
    }
  }

})();
