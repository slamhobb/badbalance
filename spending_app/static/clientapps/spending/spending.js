(function (module) {

    'use strict';

    var $ui = {},
        urls = {
            getSpendingTableUrl: '/spending/list',
            addSpendingUrl: '/spending/save'
        };

    function bindUi() {
        return {
            addSpendingForm: $('#addSpendingForm'),
            spendingTable: $('#spendingTable'),
            csrfToken: $('#csrf_token')
        }
    }

    function setupDatePicker() {
        $.datepicker.setDefaults($.datepicker.regional["ru"]);
        $('.dateinput').datepicker({dateFormat: 'yy-mm-dd'});
    }

    function setupEvents() {
        $ui.addSpendingForm.submit(addSpending);
        $ui.spendingTable.on('click', '.spending_edit', onClickEdit);
        $ui.spendingTable.on('click', '.spending_save', onClickSave);
        $ui.spendingTable.on('click', '.spending_delete', onClickDelete);
    }

    function initSpendingWidget() {
        var template = document.getElementById('spendingTemplate').innerHTML;
        spendingWidget.init1($ui.spendingTable[0], template);
    }

    function addSpending(e){
        e.preventDefault();

        var data = $ui.addSpendingForm.serialize();

        httpClient.postform(urls.addSpendingUrl, data)
            .then(onAddSpending)
            .catch(function(error){
                alert('Произошла ошибка ' + error);
            });
    }

    function onAddSpending(result) {
        if (result.hasOwnProperty('status')) {
            if (result.status) {
                updateTable();
            } else {
                alert(JSON.stringify(result.message));
            }
        }
    }

    function updateTable(){
        httpClient.getjson(urls.getSpendingTableUrl)
            .then(function(result) {
                spendingWidget.setData(result);
                spendingWidget.render();
            });
    }

    function onClickEdit() {
        var val = $(this).closest('tr').find('.spending-id--input').val();
        spendingWidget.setEdit(val, true);
        spendingWidget.render();
    }

    function onClickSave() {
        var $tr = $(this).closest('tr');

        var data = {
            id: $tr.find('.spending-id--input').val(),
            date: $tr.find('.spending-date--input').val(),
            sum: $tr.find('.spending-sum--input').val(),
            text: $tr.find('.spending-text--input').val(),
            category: $tr.find('.spending-category--input').val(),
            csrf_token: $ui.csrfToken.val()
        };

        httpClient.postform(urls.addSpendingUrl, $.param(data))
            .then(function(result) {
                onUpdateSpending(result, data);
            })
            .catch(function(error){
                alert('Произошла ошибка ' + error);
            });
    }

    function onUpdateSpending(result, data) {
        if (result.hasOwnProperty('status')) {
            if (result.status) {
                spendingWidget.updateData(data);
                spendingWidget.setEdit(data.id, false);
                spendingWidget.render();
            } else {
                alert(JSON.stringify(result.message));
            }
        }
    }

    function onClickDelete() {

    }

    module.start = function () {
        $ui = bindUi();
        setupDatePicker();
        setupEvents();
        initSpendingWidget();

        updateTable();
    };

})(BadBalance.Applications.Spending);
