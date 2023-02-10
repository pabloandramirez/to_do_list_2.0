import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask = (evento) => {
    evento.preventDefault();

    //ubicamos la informacion del HTML para obtener los valores del input como de la lista
    const list = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const calendar = document.querySelector('[data-form-date]');

    //conseguimos los datos de la informacion del HTML
    const value = input.value;
    const date = calendar.value;
    const dateFormat = moment(date).format("DD/MM/YYYY");

    if (value == "" || date == "") {
        return
    }

    
    //los inicializamos en vacio
    input.value = '';
    calendar.value = "";

    const complete = false;

    //pasamos las tareas en formato de arreglo, con un identificador poara saber cual elemento manejar
    const taskObj = {
        value,
        dateFormat,
        complete,
        id: uuid.v4()
    };

    list.innerHTML = "";

    //aunque sea const se puede agregar o modificar su contenido, solo no podra cambiarse de tipo
    //obtiene la informacion del localStorage, si esta vacio lo inicializa en un array vacio
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];//si la informacion es null agrega una informacion por defecto que es el arreglo

    //agrega la ultima tarea
    taskList.push(taskObj);

    //la llave y el valor debe estar en string, porque lo toma como objeto a la segunda variable y debe ser aplicado como JSON
    //almacena la tarea en el local storage en el formato JSON
    localStorage.setItem("tasks", JSON.stringify(taskList));

    displayTasks();
    
};


  
export const createTask = ({value, dateFormat, complete, id}) => {
    //crea una lista ordenada y si clase
    const task = document.createElement('li');
        task.classList.add('card');
    
    //crea un div para la tarea
    const taskContent = document.createElement('div');
  
    const check = checkComplete(id);
    
    //para mantener el estado azul como completo aun recargando la pagina
    if(complete){
        check.classList.toggle('fas');
        check.classList.toggle('completeIcon');
        check.classList.toggle('far');
    }
    //crea un span para el titulo de la tarea, le agrega una clase y el valor del usuario
    const titleTask = document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText = value;
        //agrega al contenido de la tarea el icono de completado y el titulo de la tarea
        taskContent.appendChild(check);
        taskContent.appendChild(titleTask);

    //crea un span para la fecha en el cual agrega el formato de la misma
    const dateElement = document.createElement("span");
        dateElement.innerHTML = dateFormat;
        //agrega a la lista el contenido de la tarea con el icono de completado, la fecha con su formato y el icono de eliminar
        task.appendChild(taskContent);
        task.appendChild(dateElement);
        task.appendChild(deleteIcon(id));

    //retorna la lista con todo el contenido agregado
    return task;
  };