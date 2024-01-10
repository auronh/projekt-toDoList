let listTodo = () => {
    let html = ``;
    let data = getData();
    if(data){
        html += `<div>`;
        data.forEach((obj,item
        ) => {
            html += `<div class="d-flex gap-3 border-bottom px-1 mb-2" id="${item}">
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
                <button class="btn"><i class="bi bi-pencil"></i></button>
                <button class="btn" onclick="removeData(${item})"><i class="bi bi-trash"></i></button>
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

