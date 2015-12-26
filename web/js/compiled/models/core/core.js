(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Core app
     * ---------
     *
     * @author Nicolas
     */
    PH.Core = (function() {
        var Core = {};

        var display = _.bind(function(){
            var self = this;

            requirejs(["/webapp/core/main/lang/ph.lang."+ PH.location +".js"], function() {
                self.layout = new self.Views.Layout({
                    model: new Backbone.Model(PH.lang.core)
                });
                self.layout.render();
                
                var header = new self.Views.Header({
                    model: new Backbone.Model(PH.lang.core)
                });

                self.layout.headerRegion.show(header);

                requirejs(['homeDust', 'home'], function () {
                    PH.vent.trigger("home:display");
                });
            });

        }, Core);

        var registerEvents = _.bind(function(){
            PH.vent.on("core:display", function(){
                display();
            });
        }, Core);

        /**
         * Initialize the generic Core system
         */
        Core.init = function() {
            PH.log("[PH.Core.init] Initializing Core page", PH.log.DEBUG);
            registerEvents();
        };


        return Core;
    })();


    /**
     * Bind initializer for Admin app
     */
    PH.addInitializer(function() {
        // Only initialize module if user is not logged in
        // if (!PH_USER_CONNECTED) {
        PH.Core.init();
        // }
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
     * Core app models
     * -------------------
     * @author Nicolas
     */
    PH.Core.Models = (function() {
        var Models = {};

        Models.Core = Backbone.Model.extend();



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
     * Core app views
     * ---------------
     *
     * @author Nicolas
     */
    PH.Core.Views = (function() {
        var Views = {};


        /**
         * Main Core layout, attaches itself to html generated with twig
         *
         * @type {Marionette.LayoutView}
         */
        Views.Layout = Marionette.LayoutView.extend({
            "el": "body",

            "template": "core",

            "regions": {
                "headerRegion": "header",
                "mainContentRegion": "#main-content"
            },

            "events": {},

            "initialize": function() {
                PH.log("[PH.Core.Views.Layout.initialize] Initializing Core layout ", PH.log.DEBUG);
            }
        });

        Views.Header = Marionette.LayoutView.extend({
           "template": "header",

            "regions": {},

            "events": {
                "click .sign-in": "displayRegister"
            },

            "initialize": function() {
                PH.log("[PH.Core.Views.Layout.initialize] Initializing Header layout", PH.log.DEBUG);
            },

            "displayRegister": function() {
                PH.vent.trigger("register:display");
            }
        });


        return Views;
    })();


})(window, jQuery);