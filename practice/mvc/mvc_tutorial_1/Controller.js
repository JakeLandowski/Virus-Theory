const MVC = (function(mvc)
{
    'use strict';

    mvc.Controller = function(model, view)
    {
        this.model = model;
        this.view = view;

        if(this.view.hasOwnPropety('onChanged'))
        {
            this.view.onChanged.attach(function(sender, data)
            {
                this.update(data);
            });
        }
    };

    mvc.Controller.prototype = 
    {
        update(data)
        {
            this.model.set(data);
        }
    };

    return mvc;

})(MVC || {});