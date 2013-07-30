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
            server: {
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

        copy: {

        },

        useminPrepare: {
            html: 'index.html',

            options: {
                dest: 'build'
            }
        },

        usemin: {
            html: ['*.html'],
//            css: ['**/*.css'],
            options: {
                dirs: [paths.build]
            }
        },

        rev: {
            options: {
                length: 8
            },

            files: {
                src: [
                    'build/js/**/*.js',
                    'build/styles/**/*.css'
                ]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            files: ['index.html', '<%= jshint.dist.src %>'],
            tasks: ['compile']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-rev');

    grunt.registerTask('livereload', ['connect', 'watch']);
    grunt.registerTask('test', ['connect', 'jasmine']);
    grunt.registerTask('compile', ['clean', 'jshint:app', 'useminPrepare', 'concat', 'uglify', 'rev']);
    grunt.registerTask('default', ['test', 'compile']);
};
