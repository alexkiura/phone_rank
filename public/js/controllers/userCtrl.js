angular.module('userCtrl', ['userService'])

// user controller for the main page
// inject user factory

.controller('userController', function(User) {
  var vm = this;

  // variable for loading things
  vm.processing = true;

  // grab all users at page load
  User.all()
    .success(function(data) {
      // falsify the processing var on getting users
      vm.processing = false;

      // bind users that come back to vm.users
      vm.users = data;

    });

  // delete user functionality
  vm.deleteUser = function(id) {
    vm.processing = true;

    User.delete(id)
      .then(function(response) {
        // get all users to update the table
        User.all()
          .then(function(response) {
            vm.processing = false;
            vm.users = response.data;
          });
      });
  }

})

// controller applied ti create a user
.controller('userCreateController', function(User) {
  var vm = this;
  // variable to hide/ show elements of the view
  // differentiates between create or edit pages
  vm.type = 'create';

  // function to create a user
  vm.saveUser = function() {
    vm.processing = true;

    // clear the message
    vm.message = '';

    // use the create function in the userService
    User.create(vm.userData)
      .then(function(response) {
        vm.processing = false;

        // clear the form
        vm.userData = {};
        vm.message = response.data.message;
      });
  };
})

// controller applied to edit the user
.controller('userEditController', function(
  $routeParams, User) {
  var vm = this;
  vm.type = 'edit';

  // get the user data for the user we want to edit
  User.get($routeParams.user_id)
    .then(function(response) {
      vm.userData = response.data;
    });

  // function to save the user
  vm.saveUser = function() {
    vm.processing = true;
    vm.message = '';

    // call the userServie function to update
    User.update($routeParams.user_id, vm.userData)
      .then(function(response) {
        vm.processing = false;

        // clear the form
        vm.userData = {};

        // bind the message from the api to vm.message
        vm.message = response.data.message;

      })
  }

})

.controller('userPhoneController', function(
  $routeParams, User) {
  var vm = this;
  //vm.processing = true; 

  User.getPhones($routeParams.user_id)
    .then(function(response) {
      console.log("Logging phones");
      console.log(response.data);
      vm.phones = response.data;
    });

})
