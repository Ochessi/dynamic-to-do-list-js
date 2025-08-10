document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(function (taskText) {
            addTask(taskText, false); // false => don't save again while loading
        });
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        const listItems = taskList.querySelectorAll('li span');
        listItems.forEach(function (span) {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a new task (taskText optional, save defaults to true)
    function addTask(taskText, save = true) {
        const text = taskText ? taskText.trim() : taskInput.value.trim();
        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        // Create list item
        const listItem = document.createElement('li');

        // Task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = text;
        listItem.appendChild(taskSpan);

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks();
        };
        listItem.appendChild(removeButton);

        // Append to list
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (save) {
            saveTasks();
        }

        // Clear input only when adding from input field
        if (!taskText) {
            taskInput.value = '';
        }
    }

    // Event listeners
    addButton.addEventListener('click', function () {
        addTask();
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});

