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
	//var trainFirstTime = moment($("#trainFirstInp").val().trim(), 'h:mm a').format("X");
	var trainFirstTime = $("#trainFirstInp").val().trim();
	var trainFreq = $("#trainFreqInp").val().trim();

	var newTrainData = {
		trainName: newTrainName,
		dest: trainDest,
		freq: trainFreq,
		nxt: trainFirstTime,
	}

	trainSchedule.push(newTrainData);

	//console.log("pushed ");
	$("#newTrainNameInp").val("");
	$("#trainDestInp").val("");
	$("#trainFirstInp").val("");
	$("#trainFreqInp").val("");

	//stay on this page
	return false;	
});

trainSchedule.on("child_added", function(childSnapshot, prevChildKey){

	var newTrainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().dest;
	var trainFirstTime = childSnapshot.val().nxt; 
	var trainFreq = childSnapshot.val().freq;	

	var minutesTilArrival;

	//take the trainFreq from input and convert from string to moment date object
	var trainFreqMoment = moment(trainFreq, 'minutes');
	
	//take the trainFirstTime from input and convert from string to moment date object
	var trainFirstTimeMoment = moment(trainFirstTime, 'h:mm a');//<---
	console.log("trainFirstTimeMoment " + trainFirstTimeMoment);
	console.log("typeof " + typeof trainFirstTimeMoment);

	//operate on the raw minutes date objects
	trainFirstTimeInMinutes = moment().diff(trainFirstTimeMoment);

	console.log("trainFirstTimeInMinutes " + trainFirstTimeInMinutes);
	console.log("typeof " + typeof trainFirstTimeInMinutes);

	//get the remainder between now and the train arrival time
	//which turns the stupid thing back into a number
	var timeRemainder = trainFirstTimeInMinutes % trainFreqMoment;
	//console.log("timeRemainder " + timeRemainder);
	//console.log(typeof timeRemainder);

	var timeRemainderMoment = moment(timeRemainder);
	console.log("timeRemainderMoment " + timeRemainderMoment);
	console.log(typeof timeRemainderMoment);

	//var minutesTilTrain = timeRemainder - trainFreqMoment;
	var minutesTilTrain = moment(timeRemainder).diff(trainFreqMoment);

	//console.log("minutesTilTrain " + moment(Math.abs(minutesTilTrain)).format("mm"));
	console.log("minutesTilTrain " + minutesTilTrain);
	console.log(typeof minutesTilTrain);

	//even more ridiculous is that any operation on a moment object turns it into something else
	//am I just stupid?  What am I missing?
	var minutesTilTrainMoment = moment(minutesTilTrain);
	console.log("minutesTilTrainMoment " + minutesTilTrainMoment);
	console.log(typeof minutesTilTrainMoment);


	var nextTrainArrives = moment(trainFirstTimeInMinutes).add(minutesTilTrainMoment);
	var nextTrainArrivesMoment = moment(nextTrainArrives);
	console.log("nextTrainArrivesMoment " + nextTrainArrivesMoment);
	console.log(typeof nextTrainArrivesMoment);
		
	$("#allTrains > tbody").append("<tr><td>" + newTrainName +
		"</td><td>" + trainDest +
		"</td><td>" + trainFreq +
		"</td><td>" + nextTrainArrivesMoment.format("hh:mm a") + 		
		//"</td><td>" + moment(Math.abs(minutesTilTrain)).format("mm") + "</td></tr>");
		"</td><td>" + minutesTilTrainMoment.format("mm") + "</td></tr>"); 

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
