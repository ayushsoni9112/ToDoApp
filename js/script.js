document.addEventListener('DOMContentLoaded', function () {
    let taskList = document.querySelector('.task-list');
    let newTaskInput = document.getElementById('new-task');
    let addTaskButton = document.getElementById('add-task');

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(task) {
        let taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        let taskName = document.createElement('span');
        taskName.textContent = task.name;

        let taskStatus = document.createElement('select');
        let statuses = ['Pending', 'In-Progress', 'Completed'];
        statuses.forEach(status => {
            let option = document.createElement('option');
            option.value = status;
            option.text = status;
            if (status === task.status) option.selected = true;
            taskStatus.appendChild(option);
        });

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        taskItem.appendChild(taskName);
        taskItem.appendChild(taskStatus);
        taskItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks(tasks);
        });
        taskStatus.addEventListener('change', function () {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(t => {
                if (t.id === task.id) {
                    t.status = taskStatus.value;
                }
            });
            saveTasks(tasks);
        });

        taskList.appendChild(taskItem);
    }
    addTaskButton.addEventListener('click', function () {
        let taskName = newTaskInput.value.trim();
        if (taskName) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            let newTask = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                name: taskName,
                status: 'Pending'
            };
            tasks.push(newTask);
            saveTasks(tasks);
            createTaskElement(newTask);
            newTaskInput.value = '';
        }
    });
    loadTasks();
});