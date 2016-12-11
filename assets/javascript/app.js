  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBjtHSLIPI6R_4F03Ed_1ldfRc363D2z8M",
      authDomain: "codingbootcamp-d5453.firebaseapp.com",
      databaseURL: "https://codingbootcamp-d5453.firebaseio.com",
      storageBucket: "codingbootcamp-d5453.appspot.com",
      messagingSenderId: "624473472355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName;
  var destination;
  var startTime;
  var frequency;


  $("#submit").on("click", function(event) {


      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      startTime = $("#startTime").val().trim();
      frequency = $("#frequency").val().trim();

      console.log(frequency);
      database.ref().push({
          trainName: trainName,
          destination: destination,
          startTime: startTime,
          frequency: frequency
      });
      return false;
  });




  database.ref().on("child_added", function(snap) {
      var startTime = snap.val().startTime;
      var convertedTime = moment(startTime, "HH:mm");
      convertedTime.format("HHmm");
      console.log("user entered: " + convertedTime.format("HHmm"));
      //Difference from start time until now in minutes
      var currentTime = moment().format("HH:mm");
      console.log("Current time = " + currentTime);
      var timeFromStart = moment().diff(convertedTime, "minutes");
      var minTillNext = -1 * (timeFromStart % snap.val().frequency);
      console.log(minTillNext.toString());
      console.log("Minutes until Next Train: " + minTillNext);
      // console.log("Calc test: " + (currentTime) + minTillNext);

      //minutes time till next

      var nextArrival = moment().add(minTillNext, 'minutes').format("HH:mm");
      // var nextArrival = currentTime;
      console.log("testing time " + nextArrival);
      console.log(nextArrival);
      // console.log(nextArrival);
      // moment().add(Duration);

      var newRow = $("<tr>");
      newRow.append($("<td>" + snap.val().trainName + "</td>"));
      newRow.append($("<td>" + snap.val().destination + "</td>"));
      newRow.append($("<td>" + snap.val().frequency + "</td>"));
      newRow.append($("<td>" + nextArrival + "</td>"));
      newRow.append($("<td>" + minTillNext + "</td>"));
      $("tbody").append(newRow);
  });
