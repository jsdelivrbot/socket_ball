'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.start',
    'myApp.config'
])
    .config(function ($locationProvider, $routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider.when('/start',
            {
                templateUrl: 'start/start.html',
                controller: 'StartCtrl'
            });

        $locationProvider.hashPrefix('!');
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        $routeProvider.otherwise({redirectTo: '/start'});

    })
    .run(function ($rootScope, $location) {
    })
