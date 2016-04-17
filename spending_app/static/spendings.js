$(document).ready(function() {
    $.datepicker.setDefaults( $.datepicker.regional["ru"] );

    $('input[name=date]').datepicker({dateFormat: 'yy-mm-dd'});

    updateSpending();
    $('#spending_form').submit(onAddEntry);
});

function onAddEntry(e) {
    e.preventDefault();

    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: $(this).serialize()
    }).done(function(){
        updateSpending();
    }).fail(function() {
        alert('Произошла ошибка');
    });
}

function updateSpending() {
    $.ajax({
        url: '/list',
        type: 'GET',
        dataType: 'html'
    }).done(function(result){
        $('#spending_table').html(result);
    });
}