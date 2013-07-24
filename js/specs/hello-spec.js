(function (window) {
    'use strict';

    var describe = window.describe,
        beforeEach = window.beforeEach,
        it = window.it,
        inject = window.inject,
//        module = window.module,
//        spyOn = window.spyOn,
        createSpyObj = window.jasmine.createSpyObj,
        controllers = window.controllers,
        expect = window.expect,
        HelloController = controllers.HelloController,

        scope,
        Family,
        controller;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        Family = createSpyObj('Family', ['get']);

        Family.get.andReturn({});

        controller = $controller(HelloController, {
            $scope: scope,
            Family: Family
        });
    }));

    describe('HelloController', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should set the family variable', function () {
            expect(scope.family).toBeDefined();
        });
    });
}(window));