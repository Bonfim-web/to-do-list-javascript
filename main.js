const addText = document.getElementById('addText');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
let editTodo = null;

// Recuperar tarefas salvas no Local Storage
function loadTasks() {
   const savedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
   savedTasks.forEach(task => addTask(task.text, task.completed));
}

// Salvar tarefas no Local Storage
function saveTasks() {
   const tasks = [];
   document.querySelectorAll('#todoList li').forEach(li => {
      tasks.push({
         text: li.querySelector('p').textContent,
         completed: li.classList.contains('completed'),
      });
   });
   localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Função para adicionar uma nova tarefa
function addTask(text, completed = false) {
   const li = document.createElement('li');
   if (completed) li.classList.add('completed');
   li.innerHTML = `
      <p>${text}</p>
      <button class="done">Done</button>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
   `;
   todoList.appendChild(li);
}

// Evento do botão de adicionar/atualizar
addButton.addEventListener('click', () => {
   const inputTodo = addText.value.trim();
   if (!inputTodo) {
      alert("O item não pode estar em branco.");
      return;
   }

   if (editTodo) {
      // Editar tarefa existente
      editTodo.querySelector('p').textContent = inputTodo;
      addButton.textContent = 'Adicionar';
      editTodo = null;
   } else {
      // Adicionar nova tarefa
      addTask(inputTodo);
   }
   addText.value = '';
   saveTasks(); // Salvar tarefas no Local Storage
});

// Evento de clique para os botões na lista
todoList.addEventListener('click', (e) => {
   const parentLi = e.target.parentElement;

   if (e.target.classList.contains('delete')) {
      parentLi.remove();
      saveTasks(); // Atualizar Local Storage após remoção
   } else if (e.target.classList.contains('done')) {
      parentLi.classList.toggle('completed');
      saveTasks(); // Atualizar Local Storage após marcar como concluído
   } else if (e.target.classList.contains('edit')) {
      addText.value = parentLi.querySelector('p').textContent;
      addButton.textContent = 'Atualizar';
      editTodo = parentLi;
   }
});

// Carregar tarefas ao carregar a página
document.addEventListener('DOMContentLoaded', loadTasks);
