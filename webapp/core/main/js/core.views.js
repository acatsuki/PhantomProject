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
                "mainContentRegion": "#main-content"
            },

            "events": {},

            "initialize": function() {
                PH.log("[PH.Core.Views.Layout.initialize] Initializing Core layout ", PH.log.DEBUG);
            }
        });


        return Views;
    })();


})(window, jQuery);