import { displayTasks } from "./readTasks.js";

const deleteIcon = (id) => {
  const i = document.createElement('i');
  i.classList.add('fas', 'fa-trash-alt', 'trashIcon', 'icon');
  i.addEventListener('click', () => deleteTask(id));
  return i;
};

const deleteTask = (id) => {
  const li = document.querySelector("[data-list]");
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex( (item) => item.id == id);
  //elimina el elemento recibiendo por donde comienza y cuantos elementos borra desde donde empieza
  tasks.splice(index,1);
  li.innerHTML = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //se actualiza la lista
  displayTasks();
};

export default deleteIcon;
