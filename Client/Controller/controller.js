angular.module('app', [])
  .controller('thecontroller', function($scope, $http){
    $scope.options = [
      {category: "All Departments"},
      {category: "Books"},
      {category: "Cars"},
      {category: "Electronics"},
      {category: "Furniture"},
      {category: "Jewelry"},
      {category: "Sporting Goods"},
      {category: "Toys/Games"}
    ];

    var refresh = function() {
      return $http({
        method:'GET',
        url: '/listings'
      }).success(function(res) {
        $scope.lists = res;
      });
    };

    $scope.search = function(category){
      $http({
        method:'GET',
        url: '/listings/category/' + category
      }).success(function(res) {
        $scope.query = res;
      });
    };

    $scope.addItem = function(post){
      console.log(post);
      $http({
        method:'POST',
        url: '/listings',
        data: post
      });
      refresh();
    };

    $scope.rent = function(item){
      item.rentable = false;
      $http({
        method: 'PUT',
        url: '/listings/' + item._id,
        data: item
      });
    };

    $scope.remove = function(item) {
      $http.delete('/listings/' + item._id).success(function(res) {
        refresh();
      });
    };


  });