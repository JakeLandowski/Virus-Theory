const MVC = (function(mvc)
{
    'use strict';

    mvc.Event = function(sender)
    {
        this.sender = sender;
        this.listeners = [];
    };

    mvc.Event.prototype = 
    {
        attach(listener)
        {
            this.listeners.push(listener);
        },

        notify(args)
        {
            // this.listeners.forEach
            // (
            //     (v, i) => this.listeners[i](this.sender, args) 
            // )

            this.listeners.map(function(listener)
            {
                listener(this.sender, args);
            });
        }
    };

    return mvc;

})(MVC || {});