(function (mainModule) {

    'use strict';

    $(function () {
        if (mainModule && mainModule.Applications.Spending) {
            mainModule.Applications.Spending.start();
        }
    });

})(BadBalance);
