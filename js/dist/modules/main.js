(function (window) {
    'use strict';

    var angular = window.angular,
        module = angular.module('main', []);

    module.controller('HelloController', ['$scope', HelloController]);

    function showAlert() {
        window.console.log('Wow');
        window.alert('wow!');
    }

    function HelloController($scope) {
        $scope.message = 'Hi, this is a message';

        $scope.showAlert = showAlert;
    }
}(window));