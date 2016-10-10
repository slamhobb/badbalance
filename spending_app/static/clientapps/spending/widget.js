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
        },

        updateData: function (data) {
            state.spending.forEach(function(item, indx) {
               if (item.id == data.id) {
                   state.spending[indx].date = data.date;
                   state.spending[indx].sum = data.sum;
                   state.spending[indx].text = data.text;
                   state.spending[indx].category = data.category;
               }
            });
        }
    }

})(window);