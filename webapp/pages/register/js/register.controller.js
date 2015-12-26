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