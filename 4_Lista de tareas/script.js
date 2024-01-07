
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const completeAllTasksButton = document.getElementById('completeAllTasks');

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        addTask(title, description);
        taskForm.reset();
    });

    completeAllTasksButton.addEventListener('click', function () {
        taskList.innerHTML = '';
    });

    function addTask(title, description) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <strong>${title}</strong>
            <p>${description}</p>
            <button class="completeTaskButton">Completar</button>
        `;
        taskList.appendChild(taskElement);

        const completeButton = taskElement.querySelector('.completeTaskButton');
        completeButton.addEventListener('click', function () {
            taskList.removeChild(taskElement);
        });
    }
});
