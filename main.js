let tarefas = []

document.getElementById("btnLogin").addEventListener("click", handleLogin);

function addTask(formEvent) {

    let buttonTask = document.getElementById("addTask");
    let textInputTask = document.getElementById("textAddTask");
    let textAddTask = textInputTask.value

    if (formEvent){
        formEvent.preventDefault();
    }

    if (textAddTask == "") {
        alert("Por favor digitar um tarefa!")
        return;
    }

    let newTask = {
        id: Date.now(),
        texto: textAddTask,
        status: false
    };

    tarefas.push(newTask);
    textInputTask.value = ""
    renderTask();
    console.log(tarefas)

    const today = new Date();
    const year = today.getFullYear();
    const mouth = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${mouth}-${day}`;
    createEventGoogle(textAddTask, formattedDate);
}

function renderTask() {
    let listHTML = document.getElementById("listaTarefas");

    listHTML.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        let currentTask = tarefas[i];
        let styleRisco = currentTask.status ? "style='text-decoration: line-through;'" : ""
        listHTML.innerHTML += `
            <li> 
                <span ${styleRisco}>${currentTask.texto}</span>
                <button onclick = "toggleTask(${currentTask.id})">✔</button>
                <button onclick = "deleteTask(${currentTask.id})">❌</button>
            </li>
        `
    }
}

function deleteTask(idTask) {
    tarefas = tarefas.filter(tarefas => tarefas.id !== idTask);
    renderTask();
}

function toggleTask(idTask) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id === idTask) {
            tarefas[i].status = !tarefas[i].status;
        }
    }
    renderTask();
}

