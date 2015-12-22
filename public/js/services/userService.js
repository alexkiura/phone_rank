angular.module('userService', [])
  .factory('User', function($http) {
    // A new object
    var userFactory = {};

    // get a single user
    userFactory.get = function(user_id) {
      return $http.get('/api/users/' + user_id);
    };
    // get all users
    userFactory.all = function() {
      return $http.get('/api/users/');
    };

    // create a user
    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

    // update a user
    userFactory.update = function(user_id, userData) {
      return $http.put('/api/users/' + user_id, userData);
    };

    // delete a user
    userFactory.delete = function(user_id) {
      return $http.delete('/api/users/' + user_id);
    };

    // =================== PHONES ======================
    // get a user's phones
    userFactory.getPhones = function(user_id) {
      return $http.get('/api/users/' + user_id + '/phones/');
    };

    userFactory.getPhone = function(user_id, phone_id) {
      var url = '/api/users/' + user_id + '/phones/' + phone_id;
      return $http.get(url);
    };

    userFactory.createPhone = function(user_id,
      phoneData) {
      var url = '/api/users/' + user_id + '/phones/';
      return $http.post(url, phoneData);
    };

    userFactory.updatePhone = function(user_id,
      phone_id, phoneData) {
      var url = '/api/users/' + user_id + '/phones/' + phone_id;
      return $http.put(url, phoneData);
    };

    userFactory.deletePhone = function(user_id, phone_id) {
      return $http.delete('/api/users/' + user_id + '/phones/' + phone_id);
    };
    // ===========================================================

    return userFactory;

  });
