module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: ['build'],

            jshint: {
                dist: {
                    src: ['src/**/*.js']
                }
            },

            concat: {
                dist: {
                    src: ['<%= jshint.dist.src %>'],
                    dest: 'build/<%= pkg.name%>.js'
                }
            },

            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },

                build: {
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }
            },

            connect: {
                server: {
                    options: {
                        port: 10000
                    }
                }
            }
        }
    )
    ;

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
}
;
