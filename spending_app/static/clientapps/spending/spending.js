(function (module) {

    'use strict';

    var $ui = {},
        urls = {
            getSpendingTableUrl: '/spending/list',
            addSpendingUrl: '/spending/add'
        };

    function bindUi() {
        return {
            addSpendingForm: $('[data-control=addSpendingForm]'),
            spendingTable: $('[data-control=spendingTable]')
        }
    }

    function setupDatePicker() {
        $.datepicker.setDefaults($.datepicker.regional["ru"]);
        $('.dateinput').datepicker({dateFormat: 'yy-mm-dd'});
    }

    function setupAddSpending() {
        $ui.addSpendingForm.submit(function (e) {
            e.preventDefault();

            var data = $ui.addSpendingForm.serialize()

            $.post(urls.addSpendingUrl, data, 'json')
                .done(onAddSpending)
                .fail(function () {
                    alert('Произошла ошибка')
                });
        });
    }

    function onAddSpending(result) {
        if (result.hasOwnProperty('status'))
        {
            if (result.status)
            {
                updateTable();
            } else {
                alert(JSON.stringify(result.message));
            }
        }
    }

    function updateTable(){
        $.get(urls.getSpendingTableUrl, function(result) {
            $ui.spendingTable.html(result);
        }, 'html');
    }

    module.start = function () {
        $ui = bindUi();
        setupDatePicker();
        setupAddSpending();

        updateTable();
    };

})(BadBalance.Applications.Spending);
