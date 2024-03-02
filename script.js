const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function calculateProgress() {
    const listItems = document.querySelectorAll("#list-container li");
    let totalTasks = listItems.length;
    let completedTasks = 0;

    listItems.forEach(function(item) {
        if (item.classList.contains("checked")) {
            completedTasks++;
        }
    });

    return { totalTasks, completedTasks };
}

function updateProgress() {
    const progress = calculateProgress();
    const progressMessage = `You have completed ${progress.completedTasks} out of ${progress.totalTasks} tasks.`;
    document.getElementById("progress").textContent = progressMessage;
}

function addTask() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    if (inputBox.value === '') {
        alert("You must write something!");
        return;
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        let deadlineInput = document.getElementById("deadline-input");
        if (deadlineInput.value !== '') {
            li.textContent += " - Deadline: " + deadlineInput.value;
        }

        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        // Add event listener for clicking on the task to update progress
        li.addEventListener("click", function() {
            li.classList.toggle("checked"); // Toggle checked class
            updateProgress(); // Update progress after clicking on the task
        });

        saveData(); // Save data to local storage after adding task
        updateProgress(); // Update progress after adding task
    }

    inputBox.value = "";
    deadlineInput.value = ""; // Clear the deadline input field
}

// Call updateProgress when the page loads
document.addEventListener("DOMContentLoaded", updateProgress);


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();

    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);

}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");

}
showTask();

