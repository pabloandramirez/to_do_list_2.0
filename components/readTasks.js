import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates } from "../services/date.js";

export const displayTasks = () => {
    //seleccion la lista donde agregar las tareas almacenadas
    const list = document.querySelector('[data-list]');

    //lee la lista de tareas ya almacenadas o si esta vacio retorna un array vacio
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    const dates = uniqueDates(taskList);
    orderDates(dates);

    dates.forEach(date => {
        //moment es de la API moments de JS
        const dateMoment = moment(date, "DD/MM/YYYY");
        list.appendChild(dateElement(date));
        //crea la lista con la tarea almacenada
        taskList.forEach(task => {
            const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
            const diff = dateMoment.diff(taskDate);
            if (diff == 0){
                list.appendChild(createTask(task));
            }
        });
    })
};