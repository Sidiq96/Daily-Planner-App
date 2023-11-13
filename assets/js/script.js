// Select the element with the ID 'time-display' using jQuery and store it in the variable 'timeDisplayEl'
var timeDisplayEl = $("#time-display");

// Declare the variable 'now' outside of the setInterval function for wider scope
var now;

// Function to handle displaying the current time
function displayTime() {
  // Gets the current time in the format "H A" (e.g., "2 PM")
  now = dayjs().format("H A");

  // Gets the current date and time 
  var rightNow = dayjs().format("DD MMM YYYY [at] hh:mm:ss a");

  // Sets the text content of the 'timeDisplayEl' element to the formatted date and time
  timeDisplayEl.text(rightNow);
}

// Set up an interval to call the 'displayTime' function every second (1000 milliseconds)
setInterval(displayTime, 1000);

// This is a array which is representing the work day schedule
var planWorkday = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

// Retrieves the 'workDay' array from local storage or use the default 'planWorkday' if not available
var workDay = JSON.parse(localStorage.getItem("workDay")) || planWorkday;

// Iterate over each element in the 'workDay' array and perform the following actions
workDay.forEach(function (timeBlock, index) {
  // Extract the time and event from the current time block
  var timeLabel = timeBlock.time;
  var blockColor = colorRow(timeLabel); // Get the color for the time block

  // Construct an HTML string representing a time block with its associated elements
  var row =
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeLabel +
    '</div><textarea class="form-control ' +
    blockColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

  // Add the row to the container element with the class 'container'
  $(".container").append(row);
});

// This is a Function to determine the color of a time block based on its relation to the current time
function colorRow(time) {
  // Get the current time and the time of the current time block
  var planNow = dayjs(now, "H A");
  var planEntry = dayjs(time, "H A");

  // This is to determine and return the appropriate class based on the relationship between the times
  if (planNow.isBefore(planEntry)) {
    return "future";
  } else if (planNow.isAfter(planEntry)) {
    return "past";
  } else {
    return "present";
  }
}
