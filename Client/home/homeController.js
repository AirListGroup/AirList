angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute', 'app.userAccountController', 'app.loginController'])

   .config(function myAppConfig ($routeProvider, authProvider){
    authProvider.init({
      domain: 'dilp.auth0.com',
      clientID: 'khcIzPKbh7xrfincGzpmj3qspWqAEgWb',
      loginUrl: '/login'
    });

    $routeProvider
    .when( '/', {
      controller: 'LoginCtrl',
      templateUrl: 'home/home.html',
      requiresLogin: false
    })
    .when( '/userAccount', {
      controller: 'mainController',
      templateUrl: 'userAccount/userAccount.html',
      requiresLogin: true
    })
    .when( '/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html'
    })

    //Called when login is successful
    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
      // Successfully log in
      // Access to user profile and token
      profilePromise.then(function(profile){
        // profile
            store.set('profile', profile);
            store.set('token', idToken);
            email = profile.email;

      });
      $location.url('/userAccount');
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function($location) {
      // If anything goes wrong
        console.log("Login Failure foo!")
        $location.url('#/');
    });

 }) //end of config

.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', function($rootScope, auth, store, jwtHelper, $location) {
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
}])

 .controller('LoginCtrl', ['$scope', 'auth', function ($scope, auth) {
    $scope.login = function(){
      if(!window.localStorage.profile) {
        auth.signin();
      }
    }
  }])

 .controller('mainController', function($scope, $http, $window){

    $scope.env = $window.location.href.split('#');

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

   $scope.addCategory = [
     {category: "Books"},
     {category: "Cars"},
     {category: "Electronics"},
     {category: "Furniture"},
     {category: "Jewelry"},
     {category: "Sporting Goods"},
     {category: "Toys/Games"}
   ];

   var refresh = function() {
      $http({
       method:'GET',
       url: '/listings'
     }).success(function(res) {
       $scope.lists = res;
     });
   };

   var queryUpdater = function() {
      $http({
       method:'GET',
       url: '/listings'
     }).success(function(res) {
       $scope.query = res;
       console.log('updating scope.query')
     });
   }

   var refreshUserListings = function() {
      $http({
       method:'GET',
       url: '/listings'
     }).success(function(res) {
       $scope.yourItems = res;
     });
   }

   $scope.goToUserAcc = function() {
    $window.location.href  = $window.location.href + 'userAccount'
   }

   $scope.viewAllListings = function() {
    $window.location.href = $window.location.origin;

   }

   $scope.logout = function() {
    window.localStorage.clear();
    $window.location.href ='https://dilp.auth0.com/v2/logout?returnTo=' + $scope.env[0];
   }

   //EMAIL FUNCTION -> TO DO: OPEN USER'S DEFAULT EMAIL CLIENT
   // $scope.email = function(item) {
   //  $window.location.href = "mailto:?subject=Subject&body=message%20goes%20here";
   //  console.log("emailing: ", item.email);
   // }

   $scope.generalListings = function() {
      $http({
       method:'GET',
       url: '/listings'
     }).success(function(res) {
       $scope.lists = res;
       console.log(res);
     });
   }

   $scope.search = function(category){
     if(category === "All Departments") {
        $http({
         method:'GET',
         url: '/listings'
       }).success(function(res) {
         $scope.query = res;
       });
     } else {
       $http({
         method:'GET',
         url: '/listings/category/' + category
       }).success(function(res) {
         $scope.query = res;
       });
     }
   };

   $scope.yourListings = function() {
      $http({
       method:'GET',
       url: '/listings'
     }).success(function(res) {
       $scope.yourItems = res;
     });
    $scope.email = JSON.parse(window.localStorage.profile).email;
    console.log($scope.email);
     refreshUserListings();
   }

   $scope.addItem = function(post){
    post.email = JSON.parse(window.localStorage.profile).email;
     $http({
       method:'POST',
       url: '/listings',
       data: post
     });
     refresh();
     refreshUserListings();
   };

   $scope.rent = function(item){
     item.rentable = false;
     item.renter = JSON.parse(window.localStorage.profile).email;
     $http({
       method: 'PUT',
       url: '/listings/' + item._id,
       data: item
     });
   };

   $scope.return = function(item){
     item.rentable = true;
     delete item.renter;
     var newItem = item;
     $http({
       method: 'PUT',
       url: '/listings/' + item._id,
       data: newItem
     });
    // refreshUserListings();
   };

   $scope.remove = function(item) {
     $http.delete('/listings/' + item._id).success(function(res) {
       refresh();
       refreshUserListings();
     });
   };


 });