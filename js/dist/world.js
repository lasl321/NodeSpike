(function (window) {
    'use strict';

    function foo(name) {
        return 'Hello ' + name;
    }

    window.foo = foo;
    var message = 'Hello';

    window.document.writeln('<h1>' + message + '</h1>');
}(window));