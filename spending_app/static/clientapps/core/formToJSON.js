(function(module) {
    'use strict';

    module.formToJSON = function (form) {
        var elements = form.elements

        var result = {};
        var obj;

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var name = el.name;
            var value = el.value;

            obj = {};
            obj[name] = value;

            Object.assign(result, obj)
        }

        return result;
    }

})(window);