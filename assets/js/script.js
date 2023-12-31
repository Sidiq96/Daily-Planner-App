// Select the element with the ID 'time-display' using jQuery and store it in the variable 'timeDisplayEl'
var timeDisplayEl = $("#time-display");

// Declare the variable 'now' outside of the setInterval function for wider scope
var now;

// Function to handle displaying the current time
// this code was from the project tracker solved example
function displayTime() {
  // Get the current time in the format "H A" (e.g., "2 PM")
  now = dayjs().format("H A");

  // Get the current date and time in a formatted string
  var rightNow = dayjs().format("DD MMM YYYY [at] hh:mm:ss a");

  // Set the text content of the 'timeDisplayEl' element to the formatted date and time
  timeDisplayEl.text(rightNow);
}

// Set up an interval to call the 'displayTime' function every second (1000 milliseconds)
setInterval(displayTime, 1000);

// an array that is representing the work day schedule
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

// Retrieve the 'workDay' array from local storage or use the default 'planWorkday' if not available
var workDay = JSON.parse(localStorage.getItem("workDay")) || planWorkday;

// Iterate over each element in the 'workDay' array and perform the following actions
workDay.forEach(function (timeBlock, index) {
  // Extract the time and event from the current time block
  var timeLabel = timeBlock.time;
  var blockColor = colorRow(timeLabel); // Get the color for the time block

  // This code creates the rows with the time in it. the code to create the divs were taken bootstrap
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

  // Add the constructed row to the container element with the class 'container'
  $(".container").append(row);
});

// Function to determine the color of a time block based on its relation to the current time
function colorRow(time) {
  // Get the current time and the time of the current time block
  var planNow = dayjs(now, "H A");
  var planEntry = dayjs(time, "H A");

  // Determine and return the appropriate class based on the relationship between the times
  if (planNow.isBefore(planEntry)) {
    return "future";
  } else if (planNow.isAfter(planEntry)) {
    return "past";
  } else {
    return "present";
  }
}
// this saves the event when the save button is pressed
$(".container").on("click", ".saveBtn", function () {
  // This gets the block ID from the closest time-block
  var blockID = parseInt($(this).closest(".time-block").attr("id"));

  // this gets the user's entry from the text area
  var userEntry = $.trim($(this).closest(".time-block").find("textarea").val());

  // then it updates the planWorkday array with the user's entry
  workDay[blockID].event = userEntry;

  // Sets local storage
  localStorage.setItem("workDay", JSON.stringify(workDay));

  // Re-render time blocks
  renderTimeBlocks();
});
