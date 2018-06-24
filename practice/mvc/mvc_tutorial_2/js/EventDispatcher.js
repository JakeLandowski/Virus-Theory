const Event = function(sender)
{
    this.sender = sender;
    this.listeners = [];
};

Event.prototype = 
{
    attach: function(listener)
    {
        this.listeners.push(listener);
    },

    notify: function(args)
    {
        listeners.map(function(listener)
        {
            listener(this.sender, args);
        });
    }
};