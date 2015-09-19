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

            self.layout = new self.Views.Layout();
            self.layout.render();

            requirejs(['homeDust', 'home'], function(){
                PH.vent.trigger("home:display");
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