'use strict';

angular.module('wwwApp').factory('MenuService', ['$http', '$q', function($http, $q) {

    var serviceBase = 'http://localhost:8080/';
    var MenuService = {};

    var _outerMenu = function() {

        var deferred = $q.defer();

        $http.get(serviceBase + 'menu').success(function(data, status, headers, config) {

            deferred.resolve(data[0]);

        }).error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;

    };

    MenuService.outerMenu = _outerMenu;

    return MenuService;
}]);
