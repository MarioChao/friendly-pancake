
// Variables

let nowDate = new Date();
const yearBegin = new Date(nowDate.getFullYear(), 0);
const newYear = new Date(nowDate.getFullYear() + 1, 0);

const secPerMin = 60;
const secPerHour = secPerMin * 60;
const secPerDay = secPerHour * 24;

let backgroundState = 0;


// Utility functions

function convertSeconds(seconds) {
	return {
		days: parseInt(seconds / secPerDay),
		hours: parseInt(seconds % secPerDay / secPerHour),
		minutes: parseInt(seconds % secPerHour / secPerMin),
		seconds: parseInt(seconds % secPerMin),
		milliseconds: parseInt(seconds * 1000 % 1000),
	}
}

function padLeft(inputStr, length, padChar) {
	// Validate input
	inputStr = inputStr.toString();
	length = parseInt(length);
	padChar = padChar.toString().charAt(0);

	// Pad
	while (inputStr.length < length) {
		inputStr = padChar + inputStr;
	}
	return inputStr;
}

// Other function

function initializeBody() {
	document.body.style.transition = "all 2000ms";

	document.body.style.backgroundColor = "#FFDEDEFF";
	document.body.style.backgroundImage = "url(./src/HNY2025.png)";
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundBlendMode = "lighten";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.color = "black";
}

function onNewYear() {
	if (backgroundState == 0) {
		// Change background
		document.body.style.backgroundColor = "#FFDEDE00";
		let navbar = document.getElementsByClassName("navbar")[0];
		navbar.style.backgroundColor = "#FFCECE00";
		navbar.style.borderBottomColor = "#00000030";
		document.body.style.color = "white";

		// Show text
		let newYearText = document.getElementById("happy-new-year");
		newYearText.removeAttribute("hidden");
		document.getElementById("new-year-number").innerText = nowDate.getFullYear();

		backgroundState = 1;
	}
}

function writeTime() {
	// Get seconds till Year Begin
	nowDate = new Date();

	// Convert it to days, hours, etc.
	let dateInterval = convertSeconds((nowDate.getTime() - yearBegin.getTime()) / 1000);
	let displayStrYearBegin = (
		padLeft(dateInterval.days, 3, 0) + " days, " +
		padLeft(dateInterval.hours, 2, 0) + " hours, " +
		padLeft(dateInterval.minutes, 2, 0) + " minutes, " +
		padLeft(dateInterval.seconds, 2, 0) + " seconds, " +
		padLeft(dateInterval.milliseconds, 3, 0) + " milliseconds since Year Begin."
	);

	// Time till New Year
	dateInterval = convertSeconds((newYear.getTime() - nowDate.getTime()) / 1000);
	let displayStrNewYear = (
		padLeft(dateInterval.days, 3, 0) + " days, " +
		padLeft(dateInterval.hours, 2, 0) + " hours, " +
		padLeft(dateInterval.minutes, 2, 0) + " minutes, " +
		padLeft(dateInterval.seconds, 2, 0) + " seconds, " +
		padLeft(dateInterval.milliseconds, 3, 0) + " milliseconds left till New Year."
	);

	// Update text
	document.getElementById("countdown-year-begin").innerText = displayStrYearBegin;
	document.getElementById("countdown-new-year").innerText = displayStrNewYear;

	// Check new year
	let msSinceNewYear = nowDate.getTime() - newYear.getTime();
	let msSinceYearBegin = nowDate.getTime() - yearBegin.getTime();
	if (0 <= msSinceNewYear || msSinceYearBegin / 1000 / secPerDay <= 12) {
		onNewYear();
	}
}

function onDOMContentLoaded() {
	initializeBody();
	setInterval(writeTime, 5);
}


// Calling functions

window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
