
angular.module('userCtrl', ['userService'])

// user controller for the main page
// inject user factory

.controller('userController', function(User){
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
	
})