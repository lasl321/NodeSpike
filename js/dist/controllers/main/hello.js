(function (controllers) {
    'use strict';

    function HelloController($scope, Family) {
        $scope.family = Family.get();
    }

    HelloController.$inject = ['$scope', 'Family'];

    controllers.HelloController = HelloController;
}(window.controllers));