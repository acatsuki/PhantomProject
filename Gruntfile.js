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
            "js_home": {
                "src": [
                    "webapp/pages/home/js/home.controller.js",
                    "webapp/pages/home/js/home.models.js",
                    "webapp/pages/home/js/home.views.js"
                ],
                "dest": "web/js/compiled/models/home/home.js"

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
                        "webapp/pages/**/dust/*.dust"
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

        watch: {
           /* "jshint": {
                "files": ['<%= jshint.files %>'],
                "tasks": ["jshint"]
            },*/

            "dust": {
                "files": "**/*.dust",
                "tasks": "dust"
            },

            "js": {
                "files": "<%= jshint.files %>",
                "tasks": [
                    "concat:js_home"
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-dust");

    // Declare default task
    grunt.registerTask("default", ["dust", "concat", "jshint"]);

};