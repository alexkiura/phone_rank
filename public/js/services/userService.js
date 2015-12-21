angular.module('userService', [])
  .factory('User', function($http) {
    // A new object
    var userFactory = {};

    // get a single user
    userFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

    // get a user's phones
    userFactory.getPhones = function(id) {
      return $http.get('/api/users/' + id + "/phones/");
    }

    // get all users
    userFactory.all = function() {
      return $http.get('/api/users/');
    };

    // create a user
    userFactory.create = function(userData) {
      return $http.post('/api/users/',
        userData);
    };

    // update a user
    userFactory.update = function(id, userData) {
      return $http.put('/api/users/' + id,
        userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };

    // 

    return userFactory;

  });
