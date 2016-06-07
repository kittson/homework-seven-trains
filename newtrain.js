
var trainSchedule = new Firebase("https://kittson-trains.firebaseio.com/");

// 2. Button for adding Employees
$("#trainSubmit").on("click", function(){

	// Grabs user input
	var newTrainName = $("#employeeNameInput").val().trim();
	var trainDest = $("#roleInput").val().trim();
	var trainNxt = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
	var trainFreq = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrainData = {
		name:  newTrainName,
		role: trainDest,
		start: trainNxt,
		rate: trainFreq
	}

	// Uploads employee data to the database
	trainSchedule.push(newTrainData);

	// Logs everything to console
	/*console.log(newTrainData.name);
	console.log(newTrainData.role);
	console.log(newTrainData.start);
	console.log(newTrainData.rate)*/

	// Alert
	//alert("Employee successfully added");

	// Clears all of the text-boxes
	$("#employeeNameInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainSchedule.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var newTrainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().role;
	var trainNxt = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().rate;

	// Employee Info
	/*console.log(newTrainName);
	console.log(trainDest);
	console.log(trainNxt);
	console.log(trainFreq);*/

	// Prettify the employee start
	var trainNxtPretty = moment.unix(trainNxt).format("MM/DD/YY");

	// Calculate the months worked using hardcore math
	// To calculate the months worked
	var empMonths = moment().diff(moment.unix(trainNxt, 'X'), "months");
	//console.log(empMonths);

	// Calculate the total billed rate
	var empBilled = empMonths * trainFreq;
	//console.log(empBilled);

	// Add each data into the table
	$("#employeeTable > tbody").append("<tr><td>" + newTrainName + "</td><td>" + trainDest + "</td><td>" + trainNxtPretty + "</td><td>" + empMonths + "</td><td>" + trainFreq + "</td><td>" + empBilled + "</td></tr>");

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case