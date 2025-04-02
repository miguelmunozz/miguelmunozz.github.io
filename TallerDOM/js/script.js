const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="complete-btn">✅</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">❌</button>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = '';
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
    } else if (event.target.classList.contains('complete-btn')) {
        const taskItem = event.target.parentElement;
        taskItem.classList.toggle('completed');
    }
    else if (event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.parentElement;
        const taskSpan = taskItem.querySelector('span');
        const newTaskText = prompt('Edita tu tarea:', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText.trim();
        } else if (newTaskText !== null) {
            alert('El texto de la tarea no puede estar vacío.');
        }
    }
});