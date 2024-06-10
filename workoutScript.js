// Set initial setsCounter
let setsCounter = 1;

// Get the button elements
let addButton = document.getElementById('add-exercise-btn');
let submitButton = document.getElementById('submit-workout-btn');

// Check if addButton is not null before adding event listener
if (addButton) {
    // Add event listener for button click
    addButton.addEventListener('click', function() {
        let exercise = document.getElementById('exercise-name');
        let exerciseValue = exercise.value.trim(); // Trim to remove any leading/trailing whitespace

        if (exerciseValue) {
            addExerciseRow(exerciseValue);
        } else {
            console.log("Exercise name is empty. Please enter a value.");
        }
    });
} else {
    console.log("Button element with ID 'add-exercise-btn' not found.");
}

// Check if submitButton is not null before adding event listener
if (submitButton) {
    // Add event listener for button click
    submitButton.addEventListener('click', submitWorkout);
} else {
    console.log("Button element with ID 'submit-workout-btn' not found.");
}

// Function to add a new row to the table
function addExerciseRow(exerciseValue) {
    console.log("addExerciseRow function called.");
    let tableBody = document.getElementById('workout-table-body');
    console.log("Table body element:", tableBody);

    // Check if there's a last row and get its exercise name
    let lastRow = tableBody.rows[tableBody.rows.length - 1];
    let lastExerciseName = lastRow ? lastRow.cells[0].textContent : "";

    // Check if the exercise value matches the last row's exercise name
    if (exerciseValue === lastExerciseName) {
        setsCounter++;
    } else {
        setsCounter = 1;
    }

    // Create a new row and cells
    let newRow = tableBody.insertRow();
    console.log("New row:", newRow);

    // Create input fields for each column
    let exerciseCell = newRow.insertCell();
    let setsCell = newRow.insertCell();
    let repsCell = newRow.insertCell();
    let weightCell = newRow.insertCell();

    // Display the exercise value in the exerciseCell
    exerciseCell.textContent = exerciseValue;

    // Display sets counter in the setsCell
    setsCell.textContent = setsCounter;

  // Add input elements for reps and weight cells with unique IDs
repsCell.innerHTML = `<input type="number" id="reps-${setsCounter}" min="1" style="width: 50px;">`; // Adjust width as needed
weightCell.innerHTML = `<input type="number" id="weight-${setsCounter}" style="width: 50px;">`; // Adjust width as needed

    console.log("Exercise added: " + exerciseValue + " | Sets: " + setsCounter);
}

// Pressing the submit button downloads a CSV file, clears all table rows and displays a message and button
function submitWorkout() {
    console.log("submitWorkout function called.");
    let tableBody = document.getElementById('workout-table-body');
    
    // Check if there are zero rows
    if (tableBody.rows.length === 0) {
        console.log("No workout data to save.");
        return; // Do nothing if there are zero rows
    }

    // Extract data from the table and format it as CSV
let csvContent = "Exercise,Sets,Reps,Weight(kg)\n";
for (let i = 0; i < tableBody.rows.length; i++) {
    let cells = tableBody.rows[i].querySelectorAll('td');
    let rowData = [];
    cells.forEach(function(cell, index) {
        // For the first three cells, get the text content
        // For the Reps and Weight cells, get the value from the input element
        if (index < 2) {
            // For Exercise and Sets columns, get text content
            rowData.push(cell.textContent.trim());
        } else {
            // For Reps and Weight columns, retrieve the value from the input element
            rowData.push(cell.querySelector('input[type="number"]').value.trim());
        }
    });
    csvContent += rowData.join(',') + "\n";
}

    // Trigger CSV download
    let encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "workout_data.csv");
    document.body.appendChild(link);
    link.click();

    // Clear the table and input field after download
    clearTableAndInput();
}

// Function to clear table and input field
function clearTableAndInput() {
    let tableBody = document.getElementById('workout-table-body');
    let exerciseInput = document.getElementById('exercise-name');
    tableBody.innerHTML = ""; // Clear table rows
    exerciseInput.value = ""; // Clear exercise input field
}

// Add event listener to the submit button
if (submitButton) {
    submitButton.addEventListener('click', submitWorkout);
} else {
    console.log("Submit button not found.");
}

// Get the delete button element
let deleteButton = document.getElementById('delete-last-set-btn');

// Check if deleteButton is not null before adding event listener
if (deleteButton) {
    // Add event listener for button click
    deleteButton.addEventListener('click', deleteLastSet);
} else {
    console.log("Button element with ID 'delete-last-set-btn' not found.");
}

// Function to delete the last row from the table
function deleteLastSet() {
    console.log("deleteLastSet function called.");
    let tableBody = document.getElementById('workout-table-body');

    // Check if there are rows in the table
    if (tableBody.rows.length === 0) {
        console.log("No rows to delete.");
        return; // Do nothing if there are zero rows
    }

    // Get the last row
    let lastRow = tableBody.rows[tableBody.rows.length - 1];
    let cells = lastRow.querySelectorAll('td');

    // Check if any cell contains data
    let hasData = Array.from(cells).some(cell => {
        if (cell.querySelector('input[type="number"]')) {
            return cell.querySelector('input[type="number"]').value.trim() !== "";
        } else {
            return cell.textContent.trim() !== "";
        }
    });

    // If there is data, ask for confirmation before deleting
    if (hasData) {
        if (confirm("Are you sure you want to delete the last set?")) {
            tableBody.deleteRow(tableBody.rows.length - 1);
            console.log("Last row deleted.");
        } else {
            console.log("Deletion cancelled.");
        }
    } else {
        tableBody.deleteRow(tableBody.rows.length - 1);
        console.log("Last row deleted.");
    }
}


