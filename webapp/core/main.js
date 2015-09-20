/*
 * Created by Nicolas on 18/09/2015.
 */
requirejs.config({
    baseUrl: "../node_modules",
    paths: {
        jquery: "jquery/jquery-2.1.4.min",
        underscore: "backbone.marionette/node_modules/underscore/underscore-min",
        moment: "moment/min/moment.min",
        backbone: "backbone.marionette/node_modules/backbone/backbone-min",
        backboneM: "backbone.marionette/lib/backbone.marionette.min",
        dust: "dust/lib/dust",
        homeDust: "../web/js/compiled/dust/home.dust",
        coreDust: "../web/js/compiled/dust/core.dust",
        core: "../web/js/compiled/models/core/core",
        home: "../web/js/compiled/models/home/home"
    }
});

var win = window;

requirejs(['jquery','underscore', 'moment', 'backboneM', 'dust'],
    function($, underscore, moment, backboneM) {
        /**
         * PH controller - Main namespace for the whole system
         */
        win.PH = new Backbone.Marionette.Application();

        /**
         * Backbone Router initialization
         * @type {Backbone.Router}
         */
        PH.Router = Backbone.Router;

        // dust.debugLevel = "DEBUG";

        var st = win.setTimeout,
            ct = win.clearTimeout;

        // Renderer with dust.js
        Backbone.Marionette.Renderer.render = function(template, data) {
            var html = "";

            dust.render(template, data, function(err, out) {
                if (err) {
                    console.error(err);
                } else {
                    html = out;
                }
            });
            return html;
        };


        /**
         * Log information to the console
         * @param  {string} msg  The message to be logged
         * @param  {mixed} type The type of log
         */
        PH.log = win.log = function(msg, type) {

            type = type || this.log.level;

            var level = typeof type === 'number' ? type : this.log[type.toUpperCase()];

            if (level <= this.log.level) {

                // Retrieve current date
                var type_name = this.log.levels[level - 1] || "log";

                msg = "[" + moment().format('YYYY-MM-DD HH:mm:ss') + "] [" + type_name.toUpperCase() + "] " + msg;

                // Log message to available console
                if (PH.log.show_detail_error || type !== "DETAILERROR") {
                    if (win.console) {
                        if (win.console[type_name]) {
                            if (win.console[type_name].call) {
                                win.console[type_name].call(win.console, msg);
                            } else {
                                win.console[type_name](msg);
                            }
                        } else if (win.console.log) {
                            if (win.console.log.call) {
                                win.console.log.call(win.console, msg);
                            } else {
                                win.console.log(msg);
                            }
                        }
                    } else if (win.opera && win.opera.postError) {
                        if (win.opera.postError.call) {
                            win.opera.postError.call(win.opera, msg);
                        } else {
                            win.opera.postError(msg);
                        }
                    }
                }

                if (level <= PH.log.history_level) {

                    PH.log.history += msg;
                    PH.log.history += ":|:";

                    if (typeof win.localStorage !== "unknown") {
                        localStorage.setItem("history", PH.log.history);
                    }
                }
            }
        };


        /**
         * return the object in consol log
         * @author Diono
         * @param  {object} obj the object that it will returned
         * @return {log}     the object
         */
        PH.log.obj = function(obj) {
            if (obj instanceof Array) {
                for (var i = 0, obj_length = obj.length; i < obj_length; i++) {
                    log.obj(obj[i]);
                }
            } else {
                if (win.console) {
                    win.console.log(obj);
                } else if (win.opera && opera.postError && JSON) {
                    opera.postError(JSON.stringify(obj));
                }
            }
        };

        // Log string types
        PH.log.levels = ['error', 'warn', 'info', 'debug'];

        // Log const types
        PH.log.ERROR = 1;
        PH.log.DETAILERROR = 1;
        PH.log.WARN = 2;
        PH.log.INFO = 3;
        PH.log.LOG = 3;
        PH.log.DEBUG = 4;

        // Current log level
        PH.log.level = PH.log.DEBUG;

        // Save history of logs
        PH.log.history_level = PH.log.WARN;
        PH.log.history = "";
        PH.log.show_detail_error = false; // display details of errors in console

        // Libs holder
        PH.Libs = {};

        PH.Models = {};

        PH.Views = {};

        PH.Collections = {};

        // Language object
        PH.lang = {};
        PH.location = "";


        PH.root_url = "";


        // Data object
        PH.data = {
            'logo': "",
            'title': "",
            'user': {
                'nick': "",
                'avatar': {
                    'src': ""
                }
            },
            'thematics': []
        };


        var ModalRegion = Backbone.Marionette.Region.extend({
            el: "#modal",

            constructor: function() {
                _.bindAll(this);
                Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
                this.on("show", this.showModal, this);
            },

            getEl: function(selector) {
                var $el = $(selector);
                $el.on("empty", this.empty);
                return $el;
            },

            showModal: function(view) {
                var self = this;


                view.on("empty", this.hideModal, this);
                this.$el.dialog(_.extend(view.dialog_options || {}, {
                    "autoOpen": false
                }));
                this.$el.dialog('open');
            },

            hideModal: function() {
                this.$el.dialog('close');
                //destroy dialog when close
                this.$el.dialog('destroy');
            }
        });


        /**
         * send javascript error
         * ---------------------
         * @author Diono
         *
         * @param  {object} data        [jquery error object]
         * @param  {string} target_name [listener target]
         * @return {object}             [PH class object]
         */
        PH.log_js_error = function(data, target_name) {

            var max_recursive_level = 1,
                toString = function(obj, recursive) {
                    var s = [];
                    for (var k in obj) {

                        if (obj[k]) {

                            var result = obj[k];

                            if ($.isFunction(obj[k])) {
                                result = false; // '[function]';

                            } else if ($.isArray(obj[k]) || $.isPlainObject(obj[k]) || typeof obj[k] == 'object') {

                                if (recursive < max_recursive_level) {

                                    result = toString(obj[k], recursive + 1);
                                } else {
                                    result = false; // '[object]';
                                }

                            }

                            if (result) {

                                s[s.length] = k + ': ' + result;
                            }
                        }
                    }
                    var space = '. . . ';
                    for (var i = 0; i < recursive; i++) {
                        space += '. . . ';
                    }
                    return "\n[DETAILERROR] " + space + " {\n[DETAILERROR] " + space + " " + s.join(",\n[DETAILERROR] " + space + " ") + "\n[DETAILERROR] " + space + " }";
                };

            for (var i in data) {

                var short_message = '';
                if (data[i].originalEvent) {
                    short_message += " { ";

                    for (var event_name in data[i].originalEvent) {
                        // short_message += event_name;
                        // short_message += " : ";

                        var type_of = typeof data[i].originalEvent[event_name];

                        if (type_of == 'string' || type_of == 'boolean' || type_of == 'number') {
                            short_message += event_name;
                            short_message += " : ";
                            short_message += data[i].originalEvent[event_name];
                        }

                        short_message += " , ";
                    }
                    short_message += " } ";
                }

                PH.log("[" + target_name + ".ERROR] " + short_message + " " + toString(data[i], 0), "DETAILERROR");
            }

            return this;
        };


        // Start Backbone.Marionette application
        $(function() {
            // Modify the default ajax settings for CROS access
            $.ajaxSetup({
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            $(document).ajaxError(function(event, jqXHR) {
                if ("401" == jqXHR.status) {
                    win.location.reload();
                }
            });

            // Set the lang on moment
            PH.location = navigator.language;

            // CodeIgniter domain
            //PH.data.domain = "http://" + PH_DOMAIN;

            PH.log("[PH.start] Starting PH Backbone.Marionette application", PH.log.DEBUG);
            PH.start();

            requirejs(['coreDust', 'core'], function(){
                PH.vent.trigger("core:display");
            });


            /*if (PH.data.logged_in) {
             PH.heartbeat.start();
             }*/
        });

    }
);
