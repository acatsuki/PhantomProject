/**
 * Created by Nicolas on 19/09/2015.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        "pkg": grunt.file.readJSON("package.json"),

        jshint: {
            files: ['Gruntfile.js', 'webapp/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        concat: {
            "js_core": {
                "src": [
                    "webapp/core/main/js/core.controller.js",
                    "webapp/core/main/js/core.models.js",
                    "webapp/core/main/js/core.views.js"
                ],
                "dest": "web/js/compiled/models/core/core.js"

            },

            "js_home": {
                "src": [
                    "webapp/pages/home/js/home.controller.js",
                    "webapp/pages/home/js/home.models.js",
                    "webapp/pages/home/js/home.views.js"
                ],
                "dest": "web/js/compiled/models/home/home.js"

            },

            "js_register": {
                "src": [
                    "webapp/pages/register/js/register.controller.js",
                    "webapp/pages/register/js/register.models.js",
                    "webapp/pages/register/js/register.views.js"
                ],
                "dest": "web/js/compiled/models/register/register.js"

            },

            css: {
                src: [
                    'web/css/core/*.css',
                    'web/css/home/*.css',
                    'web/css/register/*.css'
                ],
                dest: 'web/css/concat.css'
            }
        },

        /**
         * ====================================================================
         *
         *                 Dustjs template compilation
         *
         * ====================================================================
         */
        "dust": {
            // Task compilation Frontend
            "compile": {
                // Source files
                // ------------
                // Finds all the dust files in the web folder and compiles
                // them into one file in the web/js/compiled/dust folder
                "files": [{
                    "expand": true,
                    "cwd": "",
                    "src": [
                        "webapp/core/**/dust/*.dust",
                        "webapp/pages/**/dust/*.dust",
                        "webapp/register/**/dust/*.dust"
                    ],
                    "dest": "web/js/compiled/dust",
                    "ext": ".dust.js",
                    "flatten": true
                }],

                // Dust compilation options
                "options": {
                    "wrapper": false,
                    "runtime": false,
                    "useBaseName": true,
                    "relative": true
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'web/css/core/core.css' : 'webapp/core/main/sass/*.scss',
                    'web/css/home/home.css' : 'webapp/pages/home/sass/*.scss',
                    'web/css/home/home.css' : 'webapp/pages/register/sass/*.scss'
                }
            }
        },

        watch: {
           /* "jshint": {
                "files": ['<%= jshint.files %>'],
                "tasks": ["jshint"]
            },*/

            "css": {
                files: 'webapp/**/sass/*.scss',
                tasks: [
                    "sass",
                    "concat:css"
                ]
            },

            "dust": {
                "files": "**/*.dust",
                "tasks": "dust"
            },

            "js": {
                "files": "<%= jshint.files %>",
                "tasks": [
                    "concat:js_core",
                    "concat:js_home",
                    "concat:js_register"
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-dust");

    // Declare default task
    grunt.registerTask("default", ["concat", "sass", "css", "dust", "jshint"]);

};