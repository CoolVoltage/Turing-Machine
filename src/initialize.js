var init = function() {
	// initializing the turing machine
	time = window.setInterval(position, stack);
}

var stop = function() {
	// Exiting the turing machine
	clearInterval(time);
}
