angular.module('authService', [])
  // =======================================================
  // auth factory to login and get info
  // inject $http for communicating with the API
  // inject $q to return promise 	objects
  // inject AuthToken to manage tokens
  // =======================================================
  .factory('Auth', function($http, $q, AuthToken) {
    // create auth factory object
    var authFactory = {};

    // login a user
    authFactory.login = function(username,
      password) {
      // return the promise object and its data
      
      return $http.post('/api/authenticate', {
          username: username,
          password: password
        })
        .success(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
    };

    // logout a user by clearing a token
    authFactory.logout = function() {
      // clear the token
      AuthToken.setToken();
    };

    // check if a user is logged in
    // check if there is a local token
    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken())
        return true;
      else
        return false;
    };

    // get the logged in user
    authFactory.getUser = function() {
      
      if (AuthToken.getToken())
        return $http.get('/api/me', {cache: true});
      else
        return $q.reject({
          message: 'User has no token'
        });
    };

    // return auth factory object
    return authFactory;
  })

// =========================================================
// factory for handling tokens
// inject $window to store token client-side
// =========================================================
.factory('AuthToken', function($window) {
  var authTokenFactory = {};

  // retrieve token from local storage
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem(
      'token');
  };

  // function to set token or clear token
  // if token passed set token else rm from local storage
  authTokenFactory.setToken = function(token) {
    if (token)
      $window.localStorage.setItem('token',
        token);
    else
      $window.localStorage.removeItem(
        'token');
  };

  return authTokenFactory;
})

// ==========================================================
// app configuration to integrate function into requests
// ==========================================================
.factory('AuthInterceptor', function($q,
  $location, AuthToken) {
  var interceptorFactory = {};

  // will happen on all htttp requests
  interceptorFactory.request = function(
    config) {
    // grab the token
    var token = AuthToken.getToken();

    // if token exists add it to the header as x-access-token
    if (token) {
      console.log("There was a token and we are adding it to the header");
      config.headers['x-access-token'] = token;
      console.log(config);
    }

    return config;	
  };

  // happens on response errors
  interceptorFactory.responseError = function(response) {
  	// if our server returns a 403 forbidden response
  	if (response.status == 403) {
      AuthToken.setToken();
  		$location.path('/login');
    }

  	// return the errors from the server as a promise
  	return $q.reject(response);
  };

  return interceptorFactory;
});
