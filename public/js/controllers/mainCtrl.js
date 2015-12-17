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
          .success(function(data) {
            vm.user = data;
            console.log("The logged in user is: " + data);
          });
      });

    // function to handle login 
    vm.doLogin = function() {
      // call the Auth.login function
      vm.processing = true;
      vm.error = ' ';

      Auth.login(vm.loginData.username, vm.loginData
          .password)
        .success(function(data) {
          vm.processing = false;
          // if a user specifically logs in, redirect to users page
          if (data.success) {
            $location.path('/users');
          } else
            vm.error = data.message;

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
