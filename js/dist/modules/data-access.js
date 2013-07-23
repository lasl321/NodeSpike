(function (angular) {
    'use strict';

    var module = angular.module('dataAccess', ['ngResource']);

    module.factory('Family', ['$resource', function ($resource) {
        return $resource('/data/sample.json');
    }]);
}(window.angular));