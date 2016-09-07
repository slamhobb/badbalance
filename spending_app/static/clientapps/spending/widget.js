(function (module){

    var $renderElement;
    var renderer;
    var state;

    module.spendingWidget = {
        init1: function($element, template, editTemplate) {
            $renderElement = $element;

            renderer = jrtmpl(template);
        },

        setData: function (data) {
            state = data;
        },

        render: function() {
            $renderElement.innerHTML = renderer(state);
        },

        setEdit: function (id, edit) {
            state.spending.forEach(function(item, indx) {
               if (item.id == id) {
                   state.spending[indx].edit = edit;
               }
            });
        }
    }

})(window);