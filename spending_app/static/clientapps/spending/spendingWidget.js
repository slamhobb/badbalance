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
            var indx = this.getIndexById(id);

            state.spending[indx].edit = edit;
        },

        updateData: function (data) {
            var indx = this.getIndexById(data.id);

            state.spending[indx] = Object.assign({}, state.spending[indx], data);
        },

        getIndexById: function(id) {
            return state.spending.map(function(x) { return parseInt(x.id) }).indexOf(parseInt(id));
        }
    };



})(window);