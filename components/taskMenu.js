export default function taskMenu(){
    return `
    <div id="taskMenu" class="border p-3 rounded">
            <div class="textInput d-flex flex-column gap-1 mb-2">
              <input type="text" id="taskTitle" placeholder="Title" class="p-1" style="border: 0;" required>
              <input type="text" id="taskDescription" placeholder="Description" class="p-1" style="border: 0;">
            </div>
            <div class="d-flex gap-3">
              <input type="text" id="taskDate" placeholder="Due Date" onfocus="(this.type='date')" onblur="(this.type='text')" class="px-2" required> 
              <input type="checkbox" class="btn-check" id="taskPriority" autocomplete="off">
              <label class="btn btn-outline-danger" for="taskPriority">Priority</label><br>
            </div>
            <hr>
        <button id="cancel" class="btn btn-secondary">Cancel</button>
        <button id="addTaskBtn" class="btn btn-success">Add Task</button>
    </div>
    `
}