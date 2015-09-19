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