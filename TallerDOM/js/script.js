const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        removeTaskFromLocalStorage(taskItem.querySelector('span').textContent);
        taskList.removeChild(taskItem);
    } else if (event.target.classList.contains('complete-btn')) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle('completed');
    } else if (event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.parentElement;
        const taskSpan = taskItem.querySelector('span');
        const newTaskText = prompt('Edita tu tarea:', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            updateTaskInLocalStorage(taskSpan.textContent, newTaskText.trim());
            taskSpan.textContent = newTaskText.trim();
        } else if (newTaskText !== null) {
            alert('El texto de la tarea no puede estar vacío.');
        }
    }
});

function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="complete-btn">✅</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">❌</button>
    `;
    return taskItem;
}

function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
    });
}