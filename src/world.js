(function (window) {
    'use strict';

    function foo(bar) {
        return 'foo: ' + bar;
    }

    window.foo = foo;
}(window));