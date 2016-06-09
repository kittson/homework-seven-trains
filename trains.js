///homework seven, train schedule
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
	var trainFirstTime = $("#trainFirstInp").val().trim();
	var trainFreq = $("#trainFreqInp").val().trim();
	var newTrainData = {
		trainName: newTrainName,
		dest: trainDest,
		freq: trainFreq,
		nxt: trainFirstTime,
	}

	trainSchedule.push(newTrainData);

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

	var trainFirstConverted = moment(trainFirstTime,"hh:mm");
	console.log(trainFirstConverted);

	var diffTime = moment().diff(trainFirstConverted, "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);	

	var tRemainder = diffTime % trainFreq;
	console.log(tRemainder);

	var minutesTilTrain = trainFreq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + minutesTilTrain);

	var nextTrain = moment().add(minutesTilTrain, "minutes");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	$("#allTrains > tbody").append("<tr><td>" + newTrainName +
		"</td><td>" + trainDest +
		"</td><td>" + trainFreq +
		"</td><td>" + moment(nextTrain).format("hh:mm") + 		
		"</td><td>" + minutesTilTrain + "</td></tr>"); 
});