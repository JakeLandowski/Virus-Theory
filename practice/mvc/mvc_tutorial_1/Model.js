const MVC = (function(mvc)
{
    'use strict';

    mvc.Model = function(data)
    {
        this.data = data;
        this.onSet = new mvc.Event(this);
    };

    mvc.Model.prototype = 
    {
        get() { return this.data; },
        set(data)
        {
            this.data = data;
            this.onSet.notify({ data: data });
        }
    };

    return mvc;

})(MVC || {});