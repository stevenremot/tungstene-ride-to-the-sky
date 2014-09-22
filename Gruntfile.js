var es6ify = require("es6ify");

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            dev: {
                files: {
                    "tmp/src.js": ["src/**/*.js"]
                },
                options: {
                    transform: ["es6ify"],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        concat: {
            dev: {
                files: {
                    "tungstene.js": [es6ify.runtime, "tmp/src.js"]
                },
                options: {
                    sourceMap: true
                }
            }
        },
        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["build:dev"],
                options: {
                    spawn: false
                }
            }
        },
        jshint: {
            all: ["src/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("build:dev", ["jshint", "browserify:dev", "concat:dev"]);
};