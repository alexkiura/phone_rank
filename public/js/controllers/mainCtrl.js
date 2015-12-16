angular.module('mainCtrl', [])
  .controller('mainController', function(
    $rootScope, $location, Auth) {
    var vm = this;

    // get info if a person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart',
      function() {
        vm.loggedIn = Auth.isLoggedIn();

        // get user info on route change
        Auth.getUser()
          .then(function(data) {
            vm.user = data;
          });
      });

    // function to handle login 
    vm.doLogin = function() {
      // call the Auth.login function
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
          // if a user specifically logs in, redirect to users page
          $location.path('/users');
        });
    };

    // function to handle logging out 
    vm.doLogout = function() {
      Auth.logout();
      //reset all user info
      vm.user = {};
      $location.path('/login');
    };

  });
