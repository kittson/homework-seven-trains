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
    var time = moment().format('hh:mm:ss a');
    $('#currentTime').html("Current Time Is:  " + time);
    //$('#currentTime').append(time);
    setTimeout(displayTime, 1000);
};

function displayTrainTimeLeft() {

};

function displayTrainArrival() {
};

function showTrainSchedule() {

};

function addATrain(newTrain) {

	$('.trainName').attr(trains[newTrain].train);
	$('.dest').attr(trains[newTrain].dest);
	$('.freq').attr(trains[newTrain].freq);
	$('.nxt').attr(trains[newTrain].nxt);
	$('.lefttime').attr(trains[newTrain].lefttime);
	
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