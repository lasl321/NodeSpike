(function (window) {
    'use strict';

    function sayHi() {
        //console.log('hi');

        return 'Hi!';
    }

//    This is a comment

    sayHi();

    //window.foo('this is a test');

    function something() {
        var i = 0;
        //  i++;
        return 'hello' === null;
    }

    function foobar() {
        return 'foobar';
    }

    window.foobar = foobar;
}(window));
(function (window) {
    'use strict';

    function foo(name) {
        return 'Hello ' + name;
    }

    window.foo = foo;
    var message = 'Hello';

    window.document.writeln('<h1>' + message + '</h1>');
}(window));