//Timer for speed runs and leaderboard

var start = Date.now();

function getDelta() {
    var delta = Date.now() - start; // milliseconds elapsed since start
    return Math.floor(delta / 1000); // in seconds
    // // alternatively just show wall clock time:
    // output(new Date().toUTCString());
}