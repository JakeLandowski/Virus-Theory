const MVC = (function(mvc)
{
    'use strict';

    mvc.OneWayView = function(model, element)
    {
        this.model = model;
        this.element = element;

        this.model.onSet.attach(function()
        {
            this.show();
        });
    };

    mvc.OneWayView.prototype = 
    {
        show()
        {
            this.select.innerHTML = this.model.get();
        }
    };

    return mvc;

})(MVC || {});