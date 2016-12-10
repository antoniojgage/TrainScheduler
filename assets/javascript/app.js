// Initialize Firebase
var config = {
    apiKey: "AIzaSyBK8x0wgYA9glOk4f0KzKQ1u6s8--9p7XE",
    authDomain: "employee-data-management-7ee13.firebaseapp.com",
    databaseURL: "https://employee-data-management-7ee13.firebaseio.com",
    storageBucket: "employee-data-management-7ee13.appspot.com",
    messagingSenderId: "178524481500"
};
firebase.initializeApp(config);

var database = firebase.database();

var employeeName;
var role;
var startDate;
var monthlyRate;


$("#submit").on("click", function(event) {


    employeeName = $("#employeeName").val().trim();
    role = $("#role").val().trim();
    startDate = $("#startDate").val().trim();
    monthlyRate = $("#monthlyRate").val().trim();

    database.ref().push({
        employeeName: employeeName,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    });
});




database.ref().on("child_added", function(snap) {
    //This will convert and calculate difference of today from start date
    var startDateInput = snap.val().startDate;
    console.log("Start Date = " + startDateInput);
    var monthsConverted = moment(startDateInput, "MM/DD/YYYY");
    console.log("months converted= " + monthsConverted);
    var monthsWorked = moment().diff(monthsConverted, "months");
    console.log("Months Worked = " + monthsWorked);

    //this will calculate the rate * months worked
    var totalBilled = monthsWorked * snap.val().monthlyRate;


    var newRow = $("<tr>");
    newRow.append($("<td>" + snap.val().employeeName + "</td>"));
    newRow.append($("<td>" + snap.val().role + "</td>"));
    newRow.append($("<td>" + snap.val().startDate + "</td>"));
    newRow.append($("<td>" + monthsWorked + "</td>"));
    newRow.append($("<td>" + snap.val().monthlyRate + "</td>"));
    newRow.append($("<td>" + totalBilled + "</td>"));
    $("tbody").append(newRow);
});
