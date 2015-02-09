'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wwwApp
 */
angular.module('wwwApp')
    .controller('MainCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });


jQuery(function($) {
    $(document).ready(function() {
        //enabling stickUp on the '.navbar-wrapper' class
        $('#stickUpBar').stickUp({
            //enabling marginTop with the 'auto' setting parts: {
            parts: {
                0: 'section1',
                1: 'section2',
                2: 'section3',
                3: 'section4',
                4: 'section5',
                5: 'section6'
            },
            itemClass: 'menuItem',
            itemHover: 'menuItem-Active',
            marginTop: 'auto'
        });
    });
});
