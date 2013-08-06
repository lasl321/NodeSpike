/* jshint node:true*/
module.exports = function (grunt) {
    'use strict';

    var paths = {
        app: 'js/app',
        tests: 'js/tests',
        build: 'build'
    };

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: [paths.build],

            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },

                gruntfile: {
                    src: ['Gruntfile.js']
                },

                app: {
                    src: [
                        paths.app + '/globals.js',
                        paths.app + '/controllers/**/*.js',
                        paths.app + '/modules/**/*.js'
                    ]
                },

                tests: {
                    src: paths.tests + '/**/*.js'
                }
            },

            connect: {
                build: {
                    options: {
                        port: 10000,
                        base: paths.build,
                        keepalive: true
                    }
                },

                dev: {
                    options: {
                        port: 10000
                    }
                }
            },

            jasmine: {
                src: '<%= jshint.app.src %>',

                options: {
                    host: 'http://localhost:10000',
                    specs: '<%= jshint.tests.src %>',
                    vendor: [
                        'bower_components/jquery/jquery.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-resource/angular-resource.js',
                        'bower_components/angular-mocks/angular-mocks.js'
                    ],
                    keepRunner: false
                }
            },

            useminPrepare: {
                html: 'index.html',

                options: {
                    dest: paths.build
                }
            },

            copy: {
                html: {
                    expand: true,
                    src: '*.html',
                    dest: paths.build
                }
            },

            rev: {
                options: {
                    length: 8
                },

                files: {
                    src: [
                        paths.build + '/js/**/*.js',
                        paths.build + '/css/**/*.css'
                    ]
                }
            },

            usemin: {
                html: [paths.build + '**/*.html'],
                //      css: [paths.build + '**/*.css'],
                options: {
                    dirs: [paths.build]
                }
            },

            watch: {
                options: {
                    livereload: false
                },

                files: ['index.html', '<%= jshint.app.src %>', '<%= jshint.tests.src %>'],

                tasks: ['test']
            }
        }
    )
    ;

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-rev');

    grunt.registerTask('server', ['compile', 'connect:build']);
    grunt.registerTask('livereload', ['connect:dev', 'watch']);
    grunt.registerTask('test', ['connect:dev', 'jasmine']);
    grunt.registerTask('compile', [
        'clean',
        'jshint:app',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'rev',
        'usemin'
    ]);
    grunt.registerTask('default', ['test', 'compile']);
};
