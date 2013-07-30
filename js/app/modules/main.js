(function (angular, controllers) {
    'use strict';

    var module = angular.module('main', ['dataAccess']);

    module.controller('HelloController', controllers.HelloController);
}(window.angular, window.controllers));