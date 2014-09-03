var es6ify = require('es6ify');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dev: {
                files: {
                    'tmp/src.js': ['src/**/*.js']
                },
                options: {
                    transform: ['es6ify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'tungstene.js': [es6ify.runtime, 'tmp/src.js']
                },
                options: {
                    sourceMap: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['build:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build:dev', ['browserify:dev', 'concat:dev'])
};