///homework seven, train schedule

//$(document).ready(function(){
var trainSchedule = new Firebase("https://kittson-trains.firebaseio.com/");
function displayTime() {
    //var time = moment().format('hh:mm:ss a');
    var timeNow = moment().format('h:mm:ss a');
    $('#currentTime').html("Current Time Is:  " + timeNow);
    //$('#currentTime').append(time);
    setTimeout(displayTime, 1000);
};
	
displayTime();

//trainSchedule.remove();
$("#trainSubmit").on("click", function(){

	var newTrainName = $("#newTrainNameInp").val().trim();
	var trainDest = $("#trainDestInp").val().trim();
	//var trainNxt = $("#trainNxtInp").val().trim();
	var trainNxt = moment($("#trainNxtInp").val().trim(), 'h:mm a').format("X");
	//var trainFirst = moment($("#trainNxtInp").val().trim());
	var trainFreq = $("#trainFreqInp").val().trim();
	//var trainFreq = moment($("#trainFreqInp").val().trim(), 'mm').format("X");
	
	//var trainNxtCorrected = moment(trainNxt).format("X");
	//console.log("trainFirst is " + trainFirst);
	//console.log("trainNxtCorrected is " + trainNxtCorrected);
	
	var newTrainData = {
		trainName: newTrainName,
		dest: trainDest,
		freq: trainFreq,
		nxt: trainNxt,
		//first: trainFirst
	}
	console.log("new newTrainData " + newTrainData);
	console.log("trainFreq up is " + trainFreq);

	trainSchedule.push(newTrainData);

	//console.log("pushed ");
	$("#newTrainNameInp").val("");
	$("#trainDestInp").val("");
	$("#trainNxtInp").val("");
	$("#trainFreqInp").val("");

	//stay on this page
	return false;
	
});

trainSchedule.on("child_added", function(childSnapshot, prevChildKey){

	var newTrainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().dest;
	var trainNxt = childSnapshot.val().nxt; //should be in format X
	var trainFreq = childSnapshot.val().freq;	

	var minutesTilArrival;
	console.log("trainNxt " + trainNxt);
	//console.log(childSnapshot.val());
	/*var a = moment([2007, 0, 28]);
	var b = moment([2007, 0, 29]);
	console.log("atob " + a.to(b)); // "in a day"
	*/
	console.log(typeof trainNxt);
	//console.log("trainFreq down is " + trainFreq);
	var timeX = moment(); 
	var timeConvert = moment.unix(); //nan 
	//console.log("timeX? " + timeX);
	//console.log("timeConvert? " + timeConvert);
	//console.log("trainNxt for newTrainName " + trainNxt + " " + newTrainName);
	var thisTime = moment(parseInt(trainNxt));
	//minutesTilArrival = trainNxt - timeX; // s/b in X format	
	minutesTilArrival2 = timeX.diff(thisTime, "minutes");
	console.log(minutesTilArrival2)
	console.log(typeof minutesTilArrival2)
	console.log("minutesTilArrival2 " + moment(minutesTilArrival2).format("hh:mm"));



	var convTrainNxt = moment.unix(trainNxt).format("h:mm a"); 
	console.log("convTrainNxt " + convTrainNxt);	
	minutesTilArrival = moment().diff(moment(convTrainNxt), "minutes");	
	
	
	var convMinutesTilArrival = moment.unix(minutesTilArrival).format("mm");

	console.log("minutesTilArrival " + minutesTilArrival);
	console.log("convMinutesTilArrival " + convMinutesTilArrival);
	
	/*if (moment(convTrainNxt).isBefore(timeConvert, "minutes")) {
		console.log("before");
	};
	if (moment(convTrainNxt).isAfter(moment())) {
		console.log("after");
	};*/
	
	$("#allTrains > tbody").append("<tr><td>" + newTrainName +
		"</td><td>" + trainDest +
		"</td><td>" + trainFreq +
		"</td><td>" + convTrainNxt + 		
		"</td><td>" + convMinutesTilArrival + "</td></tr>"); 

	/*var lefttime = moment().diff(moment.unix(trainFreq, 'X'), "minutes");
	console.log("left time " + lefttime);
	var formatTrainFreq = moment.unix(trainFreq).format("hh:mm a");
	console.log("formatted " + formatTrainFreq);*/
		console.log("start exercise");
		var tFrequency = 33; 
		var firstTime = "03:30"; // Time is 3:30 AM

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % tFrequency; 
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
});

///seed trains to show...
/*var trains = [
////format - name, destination, frequency, next arrival, minutes away
{ trainName: "Hiawatha", dest: "Minneapolis, MN", freq: 30, nxt: "xxx", lefttime: 10},
{ trainName: "20th Century", dest: "New York, NY", freq: 20, nxt: "xxx", lefttime: 15},
{ trainName: "Burlington Zephyr", dest: "Burlington, VT", freq: 60, nxt: "xxx", lefttime: 15}
]; //var trains


trainSchedule.on("value", function(snapshot) {
	var whichTrain;
	displayTime();
	//console.log(snapshot.val());
	console.log(trains.length);

	for(var i =0; i < trains.length; i++){
		
		console.log("train target " + trains[i].trainName);
		//addATrain(i);
		$("#allTrains > tbody").append("<tr><td>" + 
			trains[i].trainName + "</td><td>" + 
			trains[i].dest + "</td><td>" + 
			trains[i].freq + "</td><td>" + 
			trains[i].nxt + "</td><td>" + 
			trains[i].lefttime + "</td></tr>");
		console.log("here");

	};//for
	
////trainSchedule.push(trains);
}, function (errorObject) {

	console.log("The read failed: " + errorObject.code);

});//trainSchedule*/

//});//doc ready 'cuz things aren't working
