(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Home app
     * ---------
     *
     * @author Nicolas
     */
    PH.Home = (function() {
        var Home = {};


        /**
         * Define module client-side routes
         */
        /*PH.Router.map(function() {

            // Home form route
            this.route("Home_home", {
                "path": "/",
                "authed": false,
                "action": function() {
                    PH.vent.trigger("Home:display");
                }
            });

            // Forgot password form route
            this.route("Home_forgot_password", {
                "path": "/forgot-password",
                "authed": false,
                "action": function() {
                    PH.vent.trigger("Home:display_forgot_password");
                }
            });

            // Reset password form route
            this.route("Home_reset_password", {
                "path": "/reset-password/:token",
                "authed": false,
                "action": function(token) {
                    PH.vent.trigger("Home:display_reset_password", token);
                }
            });

        });*/

        var display = _.bind(function(){
            var self = this;
            _.delay(function(){
                var layout = new self.Views.Layout();
                layout.render();
            }, 50)

        }, Home);

        var registerEvents = _.bind(function(){

        }, Home);

        /**
         * Initialize the generic Home system
         */
        Home.init = function() {
            PH.log("[PH.Home.init] Initializing Home page", PH.log.DEBUG);

            registerEvents();
            display();
        };


        return Home;
    })();


    /**
     * Bind initializer for Admin app
     */
    PH.addInitializer(function() {
        // Only initialize module if user is not logged in
        // if (!PH_USER_CONNECTED) {
        PH.Home.init();
        // }
    });


})(window, jQuery);