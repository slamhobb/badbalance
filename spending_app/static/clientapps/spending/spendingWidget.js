(function (module) {

    var $renderElement;
    var renderer;
    var list;

    module.spendingWidget = {
        init1: function($element, template) {
            $renderElement = $element;

            renderer = jrtmpl(template);
        },

        setData: function (data) {
            list = data;
        },

        render: function() {
            var table = formatTable(list);
            $renderElement.innerHTML = renderer(table);
        },

        setEdit: function (id, edit) {
            var indx = getIndexById(id);

            list[indx].edit = edit;
        },

        updateData: function (data) {
            var indx = getIndexById(data.id);

            list[indx] = Object.assign({}, list[indx], data);
        },

        deleteData: function (id) {
            var indx = getIndexById(id);

            list.splice(indx, 1);
        }
    };

    function getIndexById(id) {
        return list.map(function(x) { return parseInt(x.id) }).indexOf(parseInt(id));
    }

    function formatTable(items) {
        var prevDate = new Date(0);

        var formatedTable = items.map(function (item) {
            var curDate = new Date(item.date);

            var dateStr = curDate.getTime() !== prevDate.getTime()
                ? item.date
                : '';

            prevDate = curDate;

            return {
                id: item.id,
                dateStr: dateStr,
                date: item.date,
                sum: item.sum,
                text: item.text,
                category: item.category,
                edit: item.edit
            };
        });

        return {
            items: formatedTable
        };
    }

})(window);