(function (window) {
    'use strict';

    var describe = window.describe,
        beforeEach = window.beforeEach,
        it = window.it,
        expect = window.expect,
        spyOn = window.spyOn;

    beforeEach(function () {
        /* jshint onevar: false */
        var k;
        var l;


    });

    describe('Hello', function () {
        it('should do something', function () {
            expect(window.foo('foo')).toEqual('Hello foo');
        });

        it('should do something else', function () {
            expect(window.foobar()).toEqual('foobar');
        });
    });
}(window));