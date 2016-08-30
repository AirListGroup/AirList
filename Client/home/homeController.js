(function() {
  angular
    .module('home', ['app', 'userAccount', 'login'])
    .controller('homeController', homeController);

  homeController.$inject = ['$scope', '$http', '$window', 'Shared'];

  function homeController($scope, $http, $window, Shared) {
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
    $scope.generalListings = generalListings;

    function generalListings() {
      Shared.refreshed().then(function(res) {
        $scope.lists = res.data
        setTimeout(function() {
          $scope.lists.forEach($scope.initMap);
          $scope.$apply();
        }, 1);
      });
    }

  }
})();
