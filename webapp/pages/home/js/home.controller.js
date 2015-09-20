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

            requirejs(["/webapp/pages/home/lang/ph.lang."+ PH.lang +".js"], function(){

                self.homeLayout = new self.Views.Layout({
                    model: new self.Models.Home(PH.lang.home)
                });

                PH.Core.layout.mainContentRegion.show(self.homeLayout);
            });
        }, Home);

        var registerEvents = _.bind(function(){
            PH.vent.on("home:display", function(){
                display();
            });
        }, Home);

        /**
         * Initialize the generic Home system
         */
        Home.init = function() {
            PH.log("[PH.Home.init] Initializing Home page", PH.log.DEBUG);
            registerEvents();
        };


        return Home;
    })();


    /**
     * Bind initializer for Admin app
     */
    PH.addInitializer(function() {
        console.log("addInitializer")
        PH.Home.init();
    });


})(window, jQuery);