const TaskView = function(model)
{
    this.model = model;
    this.addTaskEvent = new Event(this);
    this.selectTaskEvent = new Event(this);
    this.unselectedTaskEvent = new Event(this);
    this.completeTaskEvent = new Event(this);
    this.deleteTaskEvent = new Event(this);
    this.init();
};

TaskView.prototype = 
{
    init: function()
    {
        this.createChildren().setupHandlers().enable();
    },

    createChildren: function()
    {
        this.container      = document.getElementsByClassName('js-container')[0];
        this.addTaskButton  = document.getElementsByClassName('js-add-task-button')[0];
        this.taskTextBox    = document.getElementsByClassName('js-task-textbox')[0];
        this.tasksContainer = document.getElementsByClassName('js-tasks-container')[0];
        return this;
    },

    setupHandlers: function()
    {
        this.addTaskButtonHandler = this.addTaskButton.bind(this);
        this.selectOrUnselectTaskHandler = this.selectOrUnselectTask.bind(this);
        this.completeTaskButtonHandler = this.completeTaskButton.bind(this);
        this.deleteTaskButtonHandler = this.deleteTaskButton.bind(this);
        
        // Handlers from EventDispatcher
        this.addTaskHandler = this.addTask.bind(this);
        this.clearTaskTextBoxHandler = this.clearTaskTextBox.bind(this);
        this.setTasksAsCompletedHandler = this.setTasksAsCompleted.bind(this);
        this.deleteTasksHandler = this.deleteTasks.bind(this);

        return this;
    },

    enable: function()
    {
        this.addTaskButton.addEventListener('click', this.addTaskButtonHandler);
        this.container.addEventListener('click', this.selectOrUnselectTaskHandler);
        this.container.addEventListener('click', this.completeTaskButtonHandler);
        this.container.addEventListener('click', this.deleteTaskButtonHandler);

        // EventDispatcher
        this.model.addTaskEvent.attach(this.addTaskHandler);
        this.model.addTaskEvent.attach(this.clearTaskTextBoxHandler);
        this.model.setTasksAsCompletedEvent.attach(this.setTasksAsCompletedHandler);
        this.model.deleteTaskEvent.attach(this.deleteTasksHandler);

        return this;
    },

    addTaskButton: function()
    {
        this.addTaskEvent.notify
        ({
            task: this.taskTextBox.value
        });
    },

    completeTaskButton: function(event)
    {
        if(event.target && event.target.matches('div.js-complete-task-button'))
            this.completeTaskEvent.notify();
    },

    deleteTaskButton: function(event)
    {
        if(event.target && event.target.matches('div.js-delete-task-button'))
            this.deleteTaskEvent.notify();
    },

    selectOrUnselectTask: function(event)
    {
        if(event.target && event.target.matches('div.js-task'))
        {
            let target = event.target;
            let taskIndex = target.dataset.index;
            
            if(target.dataset.taskSelected == 'false')
            {
                target.dataset.taskSelected = true;
                this.selectTaskEvent.notify
                ({
                    taskIndex: taskIndex
                });
            }
            else
            {
                target.dataset.taskSelected = false;
                this.unselectedTaskEvent.notify
                ({
                    taskIndex: taskIndex
                });
            }
        }
    },

    show: function()
    {
        this.buildList();
    },

    buildList: function()
    {
        let tasks = this.model.getTasks();
        let html = '';
        let tasksContainer = this.tasksContainer;
        tasksContainer.innerHTML = '';
        
        let index = 0;
        tasks.map(function(task)
        {
            html += '<div' + (task.taskStatus == 'completed' ? 'style="color: green;"' : '') + '>';
            tasksContainer.innerHTML += html + 
            '<label>' +
                '<input type="checkbox" class="js-task" data-index="' + index + '" data-task="false">' + 
                task.taskName + 
            '</label></div>';
            index++; 
        });
    },

    //================ Handlers from EventDispatcher =======================//

    clearTaskTextBox: function()
    {
        this.taskTextBox.value = '';
    },

    addTask: function()
    {
        this.show();
    },

    setTasksAsCompleted: function()
    {
        this.show();
    },

    deleteTasks: function()
    {
        this.show();
    },

};