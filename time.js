/* purpose: Generates dates and times for display
*  author: Jeff Reeves
*/

var setExpected = function(interval){
    var expected = Date.now() + interval;
    console.log('[DEBUG] Expected: ', expected);
    return expected;
}

var getDrift = function(expected){
    var drift = Date.now() - expected;
    console.log('[DEBUG] Drift: ', drift);
    return drift;
}

var setMilliseconds = function(interval, drift){
    var milliseconds = Math.max(0, interval - drift);
    console.log('[DEBUG] Milliseconds: ', milliseconds);
    return milliseconds;
}


var step = function(expected, interval){

    // get drift time
    var drift = getDrift(expected); // positive values 

    // if the time drift is too extreme
    if(drift > interval) {
        console.log('[ERROR] Drift exceeds Interval');
        return;
    }

    // set the next expected time
    expected = setExpected(interval);
    
    // update the time
    document.getElementById('time').innerHTML = new Date().toString();

    // recursively start the next step
    var milliseconds = setMilliseconds(interval, drift);
    setTimeout(step, milliseconds, expected, interval); // take into account drift
}


// create an interval for the timer 
var milliseconds = 1000;
var interval     = milliseconds;
var expected     = setExpected(interval);

// start the timer with the first step
setTimeout(step, milliseconds, expected, interval);