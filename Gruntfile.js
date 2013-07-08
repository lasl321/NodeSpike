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
                src: ['js/dist/**/*.js']
            },

            specs: {
                src: ['js/specs/**/*.js']
            }
        },

        connect: {
            server: {
                options: {
                    port: 10001,
                    keepalive: true,
                    base: 'www'
                }
            },

            testServer: {
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
                junit: {
                    path: 'build/'
                }
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

        copy: {
            dist: {
                src: '<%= uglify.dist.dest %>',
                dest: 'www/js/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            files: ['<%= connect.server.options.base %>/index.html', '<%= jshint.dist.src %>'],
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

    grunt.registerTask('test', ['connect:testServer', 'jasmine']);
    grunt.registerTask('compile', ['jshint', 'concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['test', 'compile']);
};
