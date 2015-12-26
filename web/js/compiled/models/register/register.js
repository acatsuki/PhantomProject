(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Register app
     * ---------
     *
     * @author Nicolas
     */
    PH.Register = (function() {
        var Register = {};


        /**
         * Define module client-side routes
         */
        /*PH.Router.map(function() {

            // Register form route
            this.route("Register_Register", {
                "path": "/",
                "authed": false,
                "action": function() {
                    PH.vent.trigger("Register:display");
                }
            });
        });*/

        var display = _.bind(function(){
            var self = this;
        }, Register);

        var registerEvents = _.bind(function(){
            PH.vent.on("Register:display", function(){
                display();
            });
        }, Register);

        /**
         * Initialize the generic Register system
         */
        Register.init = function() {
            PH.log("[PH.Register.init] Initializing Register page", PH.log.DEBUG);
            registerEvents();
        };


        return Register;
    })();


    /**
     * Bind initializer for Admin app
     */
    PH.addInitializer(function() {
        PH.Register.init();
    });


})(window, jQuery);
(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Register app models
     * -------------------
     * @author Nicolas
     */
    PH.Register.Models = (function() {
        var Models = {};

        Models.Register = Backbone.Model.extend();

        return Models;
    })();


})(window, jQuery);
(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Register app views
     * ---------------
     *
     * @author Nicolas
     */
    PH.Register.Views = (function() {
        var Views = {};


        /**
         * Main Register layout, attaches itself to html generated with twig
         *
         * @type {Marionette.LayoutView}
         */
        Views.Layout = Marionette.LayoutView.extend({
            "template": "Register",

            "id": "Register-content",

            "regions": {},

            "events": {},

            "initialize": function() {
                PH.log("[PH.Register.Views.Layout.initialize] Initializing Register layout ", PH.log.DEBUG);
            }
        });


        return Views;
    })();


})(window, jQuery);