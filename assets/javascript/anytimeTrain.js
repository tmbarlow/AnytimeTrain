// Initialize Firebase
var config = {
  apiKey: "AIzaSyClcEWGIkxGq1CvWGp3GLoF9Rj1n9wVd7E",
  authDomain: "anytimetrain-aab55.firebaseapp.com",
  databaseURL: "https://anytimetrain-aab55.firebaseio.com",
  projectId: "anytimetrain-aab55",
  storageBucket: "",
  messagingSenderId: "653084182886"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").format("LT");
  var frequency = $("#frequency").val().trim();

  var newTrain = {
   Name: trainName,
   City: destination,
   first: firstTrainTime,
   freq: frequency
 };  	
 database.ref().push(newTrain);

 console.log(newTrain.Name);
 console.log(newTrain.City);
 console.log(newTrain.first);
 console.log(newTrain.freq);

 $("#trainName").val("");
 $("#destination").val("");
 $("#firstTrainTime").val("");
 $("#frequency").val("");
});

database.ref().on("child_added", function(snapshot, prevChildKey) {
  var currentTime = moment().format('dddd, MMMM Do YYYY, HH:mm:ss');

  trainName = snapshot.val().Name;
  destination = snapshot.val().City;
  firstTrainTime = snapshot.val().first;
  frequency = snapshot.val().freq;


  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted)

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('HH:mm');
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
		//Append train data to table 
		$("#tableHeader > tbody").append(
			"<tr><td>" + trainName + 
			"</td><td>" + destination + 
			"</td><td>" + frequency + 
			"</td><td>" + nextTrain + 
			"</td><td>" + tMinutesTillTrain + "</td></tr>");

	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});

$(document).ready(function() {
  setInterval(function() {
   var momentNow = moment();
   $('#currentTime').html(momentNow.format('MMMM DD YYYY, HH:mm:ss'));
 });
});