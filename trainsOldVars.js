///homework seven, train schedule

	//need help 
	//adding new td elements
	//finding out time with moment
	//capturing form stuff
	//all that set stuff for firebase
	
var trainSchedule = new Firebase("https://kittson-trains.firebaseio.com/");

var trains = [
////format - name, destination, frequency, next arrival, minutes away
{ trainName: "Hiawatha", dest: "Minneapolis, MN", freq: 30, nxt: "xxx", lefttime: 10},
{ trainName: "20th Century", dest: "New York, NY", freq: 20, nxt: "xxx", lefttime: 15}
]; //var trains

function displayTime() {
    //var time = moment().format('hh:mm:ss a');
    var time = moment().format('hh:mm:ss a');
    $('#currentTime').html("Current Time Is:  " + time);
    //$('#currentTime').append(time);
    setTimeout(displayTime, 1000);


};

/////
// var employeeEndDate = moment("05/15/1965");
// ///var myDate = employeeEndDate.diff(moment().format('MM/DD/YYYY'), 'years') *-1;
// var myDate = employeeEndDate.diff(moment().format('MM/DD/YYYY'));
// console.log(moment(myDate).format('Y'));
// console.log('hello!!', myDate);


$("#addEmployeeBtn").on("click", function(){

	// Grabs user input
	var empName = $("#employeeNameInput").val().trim();
	var empRole = $("#roleInput").val().trim();
	var empStart = moment($("#startInput").val().trim(), "DD/MM/YY").format("X");
	var empRate = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newEmp = {
		name:  empName,
		role: empRole,
		start: empStart,
		rate: empRate
	}
	// Uploads employee data to the database
	employeeData.push(newEmp);

	// Logs everything to console
	console.log(newEmp.name);
	console.log(newEmp.role);
	console.log(newEmp.start);
	console.log(newEmp.rate)

	// Alert
	alert("Employee successfully added");

	// Clears all of the text-boxes
	$("#employeeNameInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

	// Prevents moving to new page
	return false;
});


$("#scheduleTrain").on("click", function(){

	var newTrainName = $("#newTrainName").val().trim();
	var trainDest = $("#trainDest").val().trim();
	var trainNxt = $("#trainNxt").val().trim();
	var trainFreq = $("#trainFreq").val().trim();

	var newTrainData = {
		trainName:  newTrainName,
		dest: trainDest,
		freq: trainNxt,
		nxt: trainFreq
	}
	// $('.trainName').attr(trains[newTrain].train);
	// $('.dest').attr(trains[newTrain].dest);
	// $('.freq').attr(trains[newTrain].freq);
	// $('.nxt').attr(trains[newTrain].nxt);
	// $('.lefttime').attr(trains[newTrain].lefttime);
	
};



function displayTrainTimeLeft() {

};

function displayTrainArrival() {
};

function showTrainSchedule() {

};




trainSchedule.on("value", function(snapshot) {

	var whichTrain;

	displayTime();

	//console.log(snapshot.val());
	console.log(trains.length);

	for(var i =0; i < trains.length; i++){
		

		console.log(trains[i].trainName);
		//addATrain(i);
		$("#trainsArea td:first-child").append(trains[i].trainName);
		$("#trainsArea td:nth-child(2)").append(trains[i].dest);
		$("#trainsArea td:nth-child(3)").append(trains[i].freq);
		$("#trainsArea td:nth-child(4)").append(trains[i].nxt);
		$("#trainsArea td:nth-child(5)").append(trains[i].lefttime);
		//$('.trainName').append(trains[i].trainName);
		// $('#dest').append(trains[i].dest);
		// $('#freq').append(trains[i].freq);
		// $('#nxt').append(trains[i].nxt);
		// $('#lefttime').append(trains[i].lefttime);
	
	};//for
	

}, function (errorObject) {

	console.log("The read failed: " + errorObject.code);

});//trainSchedule