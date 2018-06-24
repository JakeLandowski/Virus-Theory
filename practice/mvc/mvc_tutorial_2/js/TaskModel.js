const TaskModel = function()
{
    this.tasks = [];
    this.selectedTasks = [];
    this.addTaskEvent = new Event(this);
    this.removeTaskEvent = new Event(this);
    this.setTasksAsCompletedEvent = new Event(this);
    this.deleteTasksEvent= new Event(this);
};

TaskModel.prototype = 
{
    addTask: function(task)
    {
        this.tasks.push
        ({
            taskName: task,
            taskStatus: 'uncompleted'
        });

        this.addTaskEvent.notify();
    },

    getTasks: function()
    {
        return this.tasks;
    },

    setSelectedTask: function(taskIndex)
    {
        this.selectedTasks.push(taskIndex);
    },

    unselectTask: function(taskIndex)
    {
        this.selectedTasks.splice(taskIndex, 1);
    },

    setTasksAsCompleted: function()
    {
        this.selectedTasks.map(function(selectedTask)
        {
            this.tasks[selectedTask].taskStatus = 'completed';
        });

        this.setTasksAsCompletedEvent.notify();
        this.selectedTasks = [];
    },

    deleteTasks: function()
    {
        let selectedTasks = this.selectedTasks.sort();
        let length = selectedTasks.length;

        for(let i = length - 1; i >= 0; i--)
            this.tasks.splice(this.selectedTasks[i], 1);

        this.selectedTasks = [];
        this.deleteTasksEvent.notify();
    }
};