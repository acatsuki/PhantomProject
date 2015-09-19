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
            "el": "#main-content",

            "template": "home",

            "regions": {},

            "events": {},

            "initialize": function() {
                PH.log("[PH.Home.Views.Layout.initialize] Initializing Home layout ", PH.log.DEBUG);
            }
        });


        return Views;
    })();


})(window, jQuery);