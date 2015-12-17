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
      .success(function(data) {
        // get all users to update the table
        User.all()
          .success(function(data) {
            vm.processing = true;
            vm.users = data;
          });
      });
  }

})

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
      .success(function(data) {
        vm.processing = false;

        // clear the form
        vm.userData = {};
        vm.message = data.message;
      });
  };
})
