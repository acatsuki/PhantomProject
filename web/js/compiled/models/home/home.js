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
        });*/

        var display = _.bind(function(){
            var self = this;

            requirejs(["/webapp/pages/home/lang/ph.lang."+ PH.location +".js"], function(){

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
        PH.Home.init();
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
     * Home app models
     * -------------------
     * @author Nicolas
     */
    PH.Home.Models = (function() {
        var Models = {};

        Models.Home = Backbone.Model.extend();

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
     * Home app views
     * ---------------
     *
     * @author Nicolas
     */
    PH.Home.Views = (function() {
        var Views = {};


        /**
         * Main Home layout, attaches itself to html generated with twig
         *
         * @type {Marionette.LayoutView}
         */
        Views.Layout = Marionette.LayoutView.extend({
            "template": "home",

            "id": "home-content",

            "regions": {},

            "events": {},

            "initialize": function() {
                PH.log("[PH.Home.Views.Layout.initialize] Initializing Home layout ", PH.log.DEBUG);
            }
        });


        return Views;
    })();


})(window, jQuery);