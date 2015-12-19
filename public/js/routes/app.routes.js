angular.module('app.routes', ['ngRoute'])
  .config(function($routeProvider,
    $locationProvider) {
    $routeProvider
    // home page route
      .when('/', {
      templateUrl: 'views/home.html'
    })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'mainController',
        controllerAs: 'login',
      })

      // show users page
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'userController',
        controllerAs: 'user'
      })

      .when('/users/create', {
        templateUrl: 'views/user.html',
        controller: 'userCreateController',
        controllerAs: 'user'
      })

      .when('/users/:user_id', {
        templateUrl: 'views/user.html',
        controller: 'userEditController',
        controllerAs: 'user'
      });



    // rm the # from the url
    $locationProvider.html5Mode(true);

  });
