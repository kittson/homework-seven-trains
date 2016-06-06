///homework seven, train schedule
function displayTime() {
    //var time = moment().format('hh:mm:ss a');
    var time = moment().format('hh:mm:ss a');
    $('#currentTime').html("Current Time Is:  " + time);
    //$('#currentTime').append(time);
    setTimeout(displayTime, 1000);
};
	
displayTime();

var trainSchedule = new Firebase("https://kittson-trains.firebaseio.com/");
	//trainSchedule.remove();
$("#trainSubmit").on("click", function(){

	var newTrainName = $("#newTrainNameInp").val().trim();
	var trainDest = $("#trainDestInp").val().trim();
	var trainNxt = $("#trainNxtInp").val().trim();
	var trainFreq = $("#trainFreqInp").val().trim();

	var newTrainData = {
		trainName: newTrainName,
		dest: trainDest,
		freq: trainNxt,
		nxt: trainFreq
	}
	console.log("new newTrainData " + newTrainData);

	trainSchedule.push(newTrainData);

	console.log("pushed ");
	$("#newTrainNameInp").val("");
	$("#trainDestInp").val("");
	$("#trainNxtInp").val("");
	$("#trainFreqInp").val("");

	//stay on this page
	return false;
	
});

trainSchedule.on("child_added", function(childSnapshot, prevChildKey){

	console.log("got here ");

	var newTrainName = childSnapshot.val().trainName;
	var trainDest = childSnapshot.val().dest;
	var trainNxt = childSnapshot.val().freq;
	var trainFreq = childSnapshot.val().nxt;

	console.log(childSnapshot.val());

	$("#allTrains > tbody").append("<tr><td>" + newTrainName +
		"</td><td>" + trainDest +
		"</td><td>" + trainNxt +
		"</td><td>" + trainFreq + "</td></tr>"); 			

	//var lefttime = moment().diff(moment.unix(trainFreq, 'X'), "minutes");
	//console.log("left time " + lefttime);
	//var formatTrainFreq = moment.unix(trainFreq).format("hh:mm a");
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
