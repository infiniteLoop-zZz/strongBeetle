 // Workout tracker
 document.getElementById('workout-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get form values
    var exercise = document.getElementById('exercise').value;
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var weight = document.getElementById('weight').value;
  
    // Create workout log entry
    var workoutEntry = document.createElement('li');
    workoutEntry.textContent = `${exercise} - Sets: ${sets}, Reps: ${reps}, Weight: ${weight} lbs`;
  
    // Append entry to workout log
    document.getElementById('log-list').appendChild(workoutEntry);
  
    // Clear form fields
    document.getElementById('workout-form').reset();
  
    // Log to console to check if the event listener is triggered
    console.log('Workout logged:', workoutEntry.textContent);
  });