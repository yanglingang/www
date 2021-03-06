'use strict';

/**
 * @ngdoc overview
 * @name wwwApp
 * @description
 * # wwwApp
 *
 * Main module of the application.
 */
angular
    .module('wwwApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            }).when('/join', {
                templateUrl: 'views/join/index.html',
                controller: 'JoinCtrl'
            }).when('/login', {
                templateUrl: 'views/login/index.html',
                controller: 'LoginCtrl'
            }).when('/sys', {
                templateUrl: 'views/sys/index.html',
                controller: 'SysCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
