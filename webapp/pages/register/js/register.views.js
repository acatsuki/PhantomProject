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