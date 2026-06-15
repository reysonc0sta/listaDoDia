let tarefas = []

function addTask() {
    let buttonTask = document.getElementById("addTask");
    let textInputTask = document.getElementById("textAddTask");

    let textAddTask = textInputTask.value

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

