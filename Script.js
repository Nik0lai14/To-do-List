const tasks = load() ||  [
    {
        name: "Tarea 1",
        status: false
    },
    {
        name: "Tarea 2",
        status:true
    }
]
function addTask(task){
    tasks.push(task)
    render()
}
function deleteTask(index){
    tasks.splice(index, 1);
    render()
}
function toggleTask(index){
    const task= tasks[index];
    tasks[index]={
        ...task,
        status: !task.status
    }
    render()
}
function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
function load(){
    if(!localStorage.getItem("tasks"))return
    return JSON.parse(localStorage.getItem("tasks"))
}
function render(){
    let html="";
    for(let i=0; i<tasks.length; i++){
        const task= tasks[i];

        html+=`
        <div>
        <input onclick="toggleTask(${i})"type="checkbox"${task.status ? "checked" : ""}/>
        <p>${task.name}</p>
        <button onclick="deleteTask(${i})">Borrar</button>
        </div>`
    }
    document.querySelector("#tasks-list").innerHTML=html;
    save()
}
document.querySelector("[form-add-tasks]").addEventListener("submit", (e)=>{
    e.preventDefault();

    const taskInput= e.target.querySelector("[name=name]")
    const task={
        name: e.target.querySelector('[name="name"]').value,
        status: false
    }
    addTask(task)
})
document.addEventListener("DOMContentLoaded",render)