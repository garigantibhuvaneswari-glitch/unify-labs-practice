const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function() {

    if (taskInput.value.trim() === "") return;

    // Create list item
    const li = document.createElement("li");
    li.textContent = taskInput.value;

    // Toggle completed class on click
    li.addEventListener("click", function() {
        li.classList.toggle("completed");
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Remove item from DOM
    deleteBtn.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent toggle
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
});
