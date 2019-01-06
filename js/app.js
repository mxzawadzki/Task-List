const form = document.querySelector('#task-form');
const taskList = document.querySelector('.task-list__collection'); 
const clearBtn = document.querySelector('.task-list__clear-btn');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const inputLabel = document.querySelector('#inputLabel');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  taskInput.addEventListener('click', hideAlert);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'task-list__item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'task-list__delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function hideAlert(){
  if (taskInput.value === '') {
    inputLabel.classList.remove('task-form__label--visible');
  }
}

function addTask(e) {
  if(taskInput.value === '') {
    inputLabel.classList.add('task-form__label--visible');
    inputLabel.textContent = 'Please enter a task to do.';
  } else {
    const li = document.createElement('li');
    li.className = 'task-list__item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'task-list__delete-item';
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    inputLabel.classList.remove('task-form__label--visible');
    inputLabel.textContent = 'New Task';
    taskInput.value = '';
  }
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('task-list__delete-item')) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.task-list__item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}