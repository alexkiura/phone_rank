angular.module('app.routes', ['ngRoute'])
  .config(function($routeProvider,
    $locationProvider) {
    $routeProvider
    // home page route
      .when('/', {
      templateUrl: 'app/views/pages/home.html'
    });

    // rm the # from the url
    //$locationProvider.htm5Mode(true);

  });
