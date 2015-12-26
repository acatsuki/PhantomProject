(function(window, $, undefined) {
    "use strict";

    // Import globals
    var PH = window.PH,
        Backbone = window.Backbone,
        Marionette = Backbone.Marionette,
        _ = window._;


    /**
     * Register app models
     * -------------------
     * @author Nicolas
     */
    PH.Register.Models = (function() {
        var Models = {};

        Models.Register = Backbone.Model.extend();

        return Models;
    })();


})(window, jQuery);