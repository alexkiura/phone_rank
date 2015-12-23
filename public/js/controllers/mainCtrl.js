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
          .then(function(response) {
            vm.user = response.data;
            console.log('The logged in user is: ' + vm.user.name);
          });
      });

    // function to handle login 
    vm.doLogin = function() {
      // call the Auth.login function
      vm.processing = true;
      vm.error = ' ';

      Auth.login(vm.loginData.username, vm.loginData
          .password)
        .then(function(response) {
          vm.processing = false;
          // if a user specifically logs in, redirect to users page
          if (response.data.success) {
            vm.loggedIn = true;
            console.log('Logging the response: ');
            console.log(response.data);
            $location.path('/users/' + response.data.id + '/phones/' );
          } else
            vm.error = data.message;
        });
    };

    // function to handle logging out 
    vm.doLogout = function() {
      Auth.logout();
      //reset all user info
      vm.user = {};
      vm.loggedIn = false;
      $location.path('/login');
    };

  });
