let listTodo = () => {
    let html = ``;
    let data = getData();
    if(data){
        html += `<div>`;
        data.forEach((obj,item
        ) => {
            html += `<div id="task${item}">
                <div class="gap-3 border-bottom px-1 mb-2" id="${item}" style="display: flex;">
                  <label class="checkbox mt-3">
                    <input type="checkbox" id="taskCheckbox" class="checkbox__input align-self-start mt-4" onclick="completeTask(${item})"/>
                    <span class="checkbox__inner"></span>
                  </label>
                  <div class="taskinfo flex-fill">
                    <p class="fs-5 mb-1">${obj.title}</p>
                    <p class="fs-6 mb-2">${obj.description}</p>
                    <div class="taskDates d-flex justify-content-between">
                        <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>Date Created:  ${obj.dateCreated}</p>
                        <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>Due Date:  ${obj.dueDate}</p>
                    </div>
                  </div>
                  <div class="taskEvents">
                    <button class="btn" onclick="editMenu(${item})"><i class="bi bi-pencil"></i></button>
                    <button class="btn" onclick="removeData(${item})"><i class="bi bi-trash"></i></button>
                  </div>
                </div>
            </div>`;
        });
        html += `</div>`;
    }
    if(document.querySelector("#tasks")){
        document.querySelector("#tasks").innerHTML = html;
    }
    priorityChecker()
}

let getData = (item = null) => {
    let data = JSON.parse(localStorage.getItem('mytodo')); 
    if(data){

        if(item) {
            if(data.indexOf(item) != -1){
                return data[item];
            }else{
                return false;
            }
        }
        return data;
    }
    return false;
}
let getCompletedData = (item = null) => {
    let data = JSON.parse(localStorage.getItem('completedTasks')); 
    if(data){

        if(item) {
            if(data.indexOf(item) != -1){
                return data[item];
            }else{
                return false;
            }
        }
        return data;
    }
    return false;
}

let setData = (item) => {
    if(getData(item) != false) {
        alert("Item already added in todo");
    }else{
        let data = getData();
        data = (data != false) ? data : []; 
        data.push(item);
        data = JSON.stringify(data);

        localStorage.setItem('mytodo',data);
    }
}

let setCompleteTask = (item) => {
    if(getCompletedData(item) != false) {
        alert("Item already added in todo");
    }else{
        let data = getCompletedData(); 
        data = (data != false) ? data : []; 
        data.push(item);
        data = JSON.stringify(data);

        localStorage.setItem('completedTasks',data);
    }
}

let removeData = (itemId) => {
        let data = getData();
        if(data){
            let newData = data.filter((v,i) => { return i != itemId });
            newData = JSON.stringify(newData);
            localStorage.setItem('mytodo',newData);
            listTodo();
            priorityChecker()
        }else{
            alert("no data found");
        }
}

let removeCompletedData = (itemId) => {
    let data = getCompletedData();
    if(data){
        let newData = data.filter((v,i) => { return i != itemId });
        newData = JSON.stringify(newData);
        localStorage.setItem('completedTasks',newData);
        listCompletedTodo();
    }else{
        alert("no data found");
    }
}

let listCompletedTodo = () => {
    let html = ``;
    let data = getCompletedData();
    if(data){
        html += `<div>`;
        data.forEach((obj,item
        ) => {
            html += `<div class="d-flex gap-3 border-bottom px-3 mb-2">
              <div class="taskinfo flex-fill">
                <p class="fs-5 mb-1">${obj.title}</p>
                <p class="fs-6 mb-2">${obj.description}</p>
                <div class="taskDates d-flex justify-content-between">
                    <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>Date Created:  ${obj.dateCreated}</p>
                    <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>Date Completed:  ${obj.dateCompleted}</p>
                </div>
              </div>
              <div class="taskEvents">
                <button class="btn" onclick="removeCompletedData(${item})"><i class="bi bi-trash"></i></button>
              </div>
            </div>`;
        });
        html += `</div>`;
    }
    if(document.getElementById("completedTasks")){
        document.getElementById("completedTasks").innerHTML = html;
    }
    
    priorityChecker()
}



let completeTask = (itemId)=>{
    let toDoData = getData();
    const api = "https://worldtimeapi.org/api/timezone/Europe/Skopje"
    fetch(api)
    .then(response => response.json())
    .then(data =>{    
        let dateArray = data.datetime.split("T")
        let dateCompleted = dateArray[0]
        let completedData = {
            title: toDoData[itemId].title,
            description: toDoData[itemId].description,
            dateCreated: toDoData[itemId].dateCreated,
            dateCompleted: dateCompleted.split("-").reverse().join("-")
        }
        setCompleteTask(completedData)
    })
    
    removeData(itemId)
}


let addTask = (t, d, date, p) =>{
    const regex = "^\s*$"
    const api = "https://worldtimeapi.org/api/timezone/Europe/Skopje"
    fetch(api)
    .then(response => response.json())
    .then(data =>{    
        let dateArray = data.datetime.split("T")
        let dateCreated = dateArray[0]
        let dueDate = new Date(date)
        let currentDate = new Date(dateCreated)
        if(t.match(regex) !== null || date.match(regex) !== null){
            alert("Title and date are needed")
        }
        else if(dueDate < currentDate){
            alert("That date has already passed!")
        }
        else{
            let obj = {
                title: t,
                description: d,
                dueDate: date.split("-").reverse().join("-"),
                priority: p,
                dateCreated: dateCreated.split("-").reverse().join("-")
            }
            setData(obj)
            listTodo()
            priorityChecker()
        }
    })
}

let editMenu = (item) => {
    let data = getData()
    
    document.getElementById(`task${item}`).innerHTML +=`
    <div id="editMenu" class="border p-3 rounded mb-3">
            <div class="textInput d-flex flex-column gap-1 mb-2">
              <input type="text" id="editTitle" placeholder="${data[item].title}" value="${data[item].title}" class="p-1 border" required>
              <input type="text" id="editDescription" placeholder="${data[item].description}" value="${data[item].description}" class="p-1 border" style="border: 0;">
            </div>
            <div class="d-flex gap-3">
              <input type="text" id="editDate" placeholder="Due Date" value="${data[item].dueDate}" onfocus="(this.type='date')" onblur="(this.type='text')" class="px-2" required> 
            </div>
            <hr>
        <button id="cancelEdit" onclick="cancelEdit(${item})" class="btn btn-secondary">Cancel</button>
        <button id="editTaskBtn" onclick="editTask(${item})" class="btn btn-success">Edit Task</button>
    </div>
    `
    document.getElementById(item).style.display = "none"
}

let editTask = (item) =>{
    let data = getData()
    let newObj = {
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        dueDate: document.getElementById("editDate").value.split("-").reverse().join("-"),
        priority: data[item].priority,
        dateCreated: data[item].dateCreated
    }
    newObj = JSON.parse(JSON.stringify(newObj)) 

    
    setData(newObj)
    removeData(item)
    listTodo()
    
}

let cancelEdit = (item)=>{
    document.getElementById(item).style.display = "flex"
    document.getElementById("editMenu").remove()
}

let priorityChecker = ()=>{
    let myTodo = getData()
    let html = `
        <h5>Important tasks</h5>
        <hr>
    `
    if(myTodo != false){
        myTodo.forEach(obj =>{
            if(obj.priority == true){
                html+=`
                <a href="./index.html" class="nav-link navItems text-white text-center">
                    ${obj.title}
                </a>`
            }
        })
    }
    
    document.getElementById("importantTasks").innerHTML = html
}

listCompletedTodo()
listTodo();
