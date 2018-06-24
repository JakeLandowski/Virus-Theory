const MVC = (function(mvc)
{
    'use strict';

    mvc.TwoWayView = function(model, element)
    {
        this.model = model;
        this.element = element;
        this.onChanged = new mvc.Event(this);
        
        this.model.onSet.attach(function()
        {
            this.show();
        });

        this.element.addEventListener('change', function(event)
        {
            this.onChanged.notify(event.target.value);
        });
    };

    mvc.TwoWayView.prototype = 
    {
        show()
        {
            this.element.value = this.model.get();
        }
    };

    return mvc;

})(MVC || {});