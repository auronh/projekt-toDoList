/* handler for print todo  */
let listTodo = () => {
    let html = ``;
    let data = getData(); // handler for getting item from local storage
    if(data){
        html += `<div>`;
        data.forEach((obj,item
        ) => {
            html += `<div class="d-flex gap-3 border-bottom px-1 mb-2">
              <label class="checkbox mt-3">
                <input type="checkbox" id="taskCheckbox" class="checkbox__input align-self-start mt-4" onclick="completeTask(${item})"/>
                <span class="checkbox__inner"></span>
              </label>
              <div class="taskinfo flex-fill">
                <p class="fs-5 mb-1">${obj.title}</p>
                <p class="fs-6 mb-2">${obj.description}</p>
                <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>${obj.dueDate}</p>
              </div>
              <div class="taskEvents">
                <button class="btn"><i class="bi bi-pencil"></i></button>
                <button class="btn" onclick="removeData(${item})"><i class="bi bi-trash"></i></button>
              </div>
            </div>`;
        });
        html += `</div>`;
    }
    document.getElementById("tasks").innerHTML = html;
    priorityChecker()
}

 /* handler for get todo  */
let getData = (item = null) => {
    /*
    * localStorage.getItem(<itemname>) main method 
    * (predefined method of js) for getting item from localstorage
    */
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
    /*
    * localStorage.getItem(<itemname>) main method 
    * (predefined method of js) for getting item from localstorage
    */
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


 // call print handler for showing data into list 
 let priorityChecker = ()=>{
    let myTodo = getData()
    let html = `
        <h5>Important tasks</h5>
        <hr>
    `
    myTodo.forEach(todo =>{
        console.log(todo.priority)
    })
    document.getElementById("importantTasks").innerHTML = html
}
listTodo();
 /* handler for set data/item todo  */
let setData = (item) => {
    if(getData(item) != false) {
        alert("Item already added in todo");
    }else{
        let data = getData(); // call getdata handler for getting  data from list 
        data = (data != false) ? data : []; 
        data.push(item);
        data = JSON.stringify(data);
        /*
        * localStorage.setItem(<itemname>,<itemvalue>) main method 
        * (predefined method of js) for set item into localstorage
        */
        localStorage.setItem('mytodo',data);
    }
}

let setCompleteTask = (item) => {
    if(getCompletedData(item) != false) {
        alert("Item already added in todo");
    }else{
        let data = getCompletedData(); // call getdata handler for getting  data from list 
        data = (data != false) ? data : []; 
        data.push(item);
        data = JSON.stringify(data);
        /*
        * localStorage.setItem(<itemname>,<itemvalue>) main method 
        * (predefined method of js) for set item into localstorage
        */
        localStorage.setItem('completedTasks',data);
    }
}

/* handler for remove item from localstorage */
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

let listCompletedTodo = () => {
    let html = ``;
    let data = getCompletedData(); // handler for getting item from local storage
    if(data){
        html += `<div>`;
        data.forEach((obj,item
        ) => {
            html += `<div class="d-flex gap-3 border-bottom px-1 mb-2">
              <label class="checkbox mt-3">
                <input type="checkbox" id="taskCheckbox" class="checkbox__input align-self-start mt-4" onclick="completeTask(${item})"/>
                <span class="checkbox__inner"></span>
              </label>
              <div class="taskinfo flex-fill">
                <p class="fs-5 mb-1">${obj.title}</p>
                <p class="fs-6 mb-2">${obj.description}</p>
                <p class="d-flex gap-1" style="font-size: 12px;"><i class="bi bi-calendar-event"></i>${obj.dueDate}</p>
              </div>
              <div class="taskEvents">
                <button class="btn"><i class="bi bi-pencil"></i></button>
                <button class="btn" onclick="removeData(${item})"><i class="bi bi-trash"></i></button>
              </div>
            </div>`;
        });
        html += `</div>`;
    }
    document.getElementById("completedTasks").innerHTML = html;
    priorityChecker()
}



let completeTask = (itemId)=>{
    let data = getData();
    setCompleteTask(data[itemId])
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

