'use strict';

angular.module('wwwApp').factory('MenuService', ['$http', '$q', function($http, $q) {

    var serviceBase = 'http://localhost:8080/';
    var MenuService = {};
    var menu = {};

    var _getOuterMenu = function() {

        var deferred = $q.defer();

        $http.get(serviceBase + 'menu?type=outer').success(function(data, status, headers, config) {

            deferred.resolve(data[0]);

        }).error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };
    var _getInnerMenu = function() {

        var deferred = $q.defer();

        $http.get(serviceBase + 'menu?type=inner').success(function(data, status, headers, config) {

            deferred.resolve(data[0]);

        }).error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };


    MenuService.getOuterMenu = _getOuterMenu;
    MenuService.getInnerMenu = _getInnerMenu;
    return MenuService;
}]);
