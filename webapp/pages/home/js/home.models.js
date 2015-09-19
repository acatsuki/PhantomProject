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