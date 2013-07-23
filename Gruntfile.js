module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['build'],

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            dist: {
                src: [
                    'js/dist/globals.js',
                    'js/dist/controllers/**/*.js',
                    'js/dist/modules/**/*.js'
                ]
            },

            specs: {
                src: ['js/specs/**/*.js']
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
            src: '<%= jshint.dist.src %>',

            options: {
                host: 'http://localhost:10000',
                specs: '<%= jshint.specs.src %>',
                vendor: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-mocks/angular-mocks.js'
                ],
                keepRunner: true
            }
        },

        concat: {
            dist: {
                src: ['<%= jshint.dist.src %>'],
                dest: 'build/<%= pkg.name%>.js'
            }
        },

        uglify: {
            dist: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        rev: {
            options: {
                length: 8
            },

            files: {
                src: '<%= uglify.dist.dest %>'
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
    grunt.loadNpmTasks('grunt-rev');

    grunt.registerTask('livereload', ['connect', 'watch']);
    grunt.registerTask('test', ['connect', 'jasmine']);
    grunt.registerTask('compile', ['clean', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['test', 'compile']);
};
