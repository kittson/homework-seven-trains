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
	var trainFreq = $("#trainFreqInp").val().trim();

	var newTrainData = {
		trainName: newTrainName,
		dest: trainDest,
		freq: trainFreq,
		nxt: trainNxt,
	}

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
	var trainNxt = childSnapshot.val().nxt; 
	var trainFreq = childSnapshot.val().freq;	

	var minutesTilArrival;
	var now = moment();
	console.log("now " + now);
	console.log(typeof now);

	console.log("trainNxt " + trainNxt);
	console.log(typeof trainNxt);

	//take the trainFreq from input and convert from string to moment date object
	console.log("trainFreq " + trainFreq);
	console.log(typeof trainFreq);
	var trainFreqMoment = moment(trainFreq, 'minutes');
	
	//take the trainNxt from input and convert from string to moment date object
	var trainNxtMoment = moment(trainNxt, 'h:mm a');//<---

	//console.log("trainNxtMoment " + trainNxtMoment);
	//console.log(typeof trainNxtMoment);
	//console.log("trainNxtMoment formatted " + trainNxtMoment.format("h:mm a"));//and back to a string

	//works to make it a number instead of a string but it's the wrong number 'cuz it's not a date
	//var trainNxtNumberized = moment(parseInt(trainNxt));	
	//console.log("trainNxtNumberized " + trainNxtNumberized);
	//console.log(typeof trainNxtNumberized);

	//trainNxtInMinutes = now.diff(trainNxtNumberized, "minutes");
	//trainNxtInMinutes = moment().diff(trainNxtMoment, "minutes");
	trainNxtInMinutes = moment().diff(trainNxtMoment);

	console.log("trainNxtInMinutes " + trainNxtInMinutes);
	console.log("typeof " + typeof trainNxtInMinutes);


	//console.log("trainNxtInMinutes formatted " + moment(trainNxtInMinutes).format("hh:mm"));
	//console.log("typeof " + typeof moment(trainNxtInMinutes).format("hh:mm"));
	//get the remainder between now and the train arrival time
	var timeRemainder = trainNxtInMinutes % trainFreqMoment;
	console.log("timeRemainder " + timeRemainder);
	console.log(typeof timeRemainder);
	//console.log("timeRemainder formatted " + moment(timeRemainder).format("minutes"));

	var minutesTilTrain = timeRemainder - trainFreqMoment;

	//console.log("minutesTilTrain " + moment(Math.abs(minutesTilTrain)).format("mm"));
	console.log("minutesTilTrain " + moment(Math.abs(minutesTilTrain)).format("mm"));

	var nextTrainArrives = moment().add(minutesTilTrain, "minutes");
	console.log("nextTrainArrives " + nextTrainArrives);
	console.log(typeof nextTrainArrives);
	
	
	$("#allTrains > tbody").append("<tr><td>" + newTrainName +
		"</td><td>" + trainDest +
		"</td><td>" + trainFreq +
		"</td><td>" + nextTrainArrives + 		
		"</td><td>" + moment(Math.abs(minutesTilTrain)).format("mm") + "</td></tr>"); 

	/*var lefttime = moment().diff(moment.unix(trainFreq, 'X'), "minutes");
	console.log("left time " + lefttime);
	var formatTrainFreq = moment.unix(trainFreq).format("hh:mm a");
	console.log("formatted " + formatTrainFreq);*/
		// console.log("start exercise");
		// var tFrequency = 33; 
		// var firstTime = "03:30"; // Time is 3:30 AM

		// // First Time (pushed back 1 year to make sure it comes before current time)
		// var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
		// console.log(firstTimeConverted);

		// // Current Time
		// var currentTime = moment();
		// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// // Difference between the times
		// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// console.log("DIFFERENCE IN TIME: " + diffTime);

		// // Time apart (remainder)
		// var tRemainder = diffTime % tFrequency; 
		// console.log(tRemainder);

		// // Minute Until Train
		// var tMinutesTillTrain = tFrequency - tRemainder;
		// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// // Next Train
		// var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
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
