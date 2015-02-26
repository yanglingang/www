'use strict';

angular.module('wwwApp').factory('authService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService) {

    var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ''
    };

    var _saveRegistration = function(registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function(response) {
            return response;
        });

    };

    var _login = function(loginData) {

        var data = 'grant_type=password&username=' + loginData.userName + '&password=' + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(response) {

            localStorageService.set('authorizationData', {
                token: response.access_token,
                userName: loginData.userName
            });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function(err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function() {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = '';

    };

    var _fillAuthData = function() {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);

angular.module('wwwApp').controller('signupController', ['$scope', '$location', '$timeout', 'authService', function($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = '';

    $scope.registration = {
        userName: '',
        password: '',
        confirmPassword: ''
    };

    $scope.signUp = function() {

        authService.saveRegistration($scope.registration).then(function(response) {

                $scope.savedSuccessfully = true;
                $scope.message = 'User has been registered successfully, you will be redicted to login page in 2 seconds.';
                startTimer();

            },
            function(response) {
                var errors = [];
                for (var key in response.data.modelState) {
                    for (var i = 0; i < response.data.modelState[key].length; i++) {
                        errors.push(response.data.modelState[key][i]);
                    }
                }
                $scope.message = 'Failed to register user due to:' + errors.join(' ');
            });
    };

    var startTimer = function() {
        var timer = $timeout(function() {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);

angular.module('wwwApp').controller('LoginCtrl', ['$scope', '$location', 'authService', function($scope, $location, authService) {

    $scope.loginData = {
        userName: '',
        password: ''
    };

    $scope.message = '';

    $scope.login = function() {
        $location.path('/sys');
        // authService.login($scope.loginData).then(function(response) {

        //         $location.path('/');

        //     },
        //     function(err) {
        //         $scope.message = err.error_description;
        //     });
    };

}]);
