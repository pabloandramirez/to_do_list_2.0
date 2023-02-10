export default (date) => {
    //crea la casilla para poner la fecha como titulo
    const dateElement = document.createElement("li");
    dateElement.classList.add("date");
    dateElement.innerHTML = date;
    return dateElement;
}