var timesPerSecond = 0;
var rate = 0;
var i = 15;
var times = 0;
var socket = io('https://kkey-leaderboard.herokuapp.com/');
var countingDown = false;
var myVar = setInterval(checkRate, 1000);
var leaderboard = [];
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 75) {
        if (!countingDown) {
            i = 3;
            countingDown = true;
            onTimer();
        }
        times = times + 5000000000000000000000000000000;
        timesPerSecond = timesPerSecond + 5000000000000000000000000000000;
        document.getElementById('pressed').innerHTML = times;
    }
}

function onTimer() {
    document.getElementById('mycounter').innerHTML = i;
    i--;
    if (i < 0) {
        alert('TIME UP');
        socket.emit('score', {
            player: prompt('What is your name?'),
            score: times
        }) countingDown = false;
        times = 0;
    } else if (countingDown) {
        setTimeout(onTimer, 1000);
    }
}

function checkRate() {
    rate = timesPerSecond;
    document.getElementById('rate').innerHTML = rate;
    timesPerSecond = 0;
} //socket stuff 
socket.on('connected', function () { console.log('Successfully connected to server.'); }); 
socket.on('updateL', function(newLeader){ leaderboard = newLeader; console.log(leaderboard); var string = '' for(var i = 0; i<leaderboard.length; i++){ string = string + "#" + eval(i+1) + " " + leaderboard[i].player + ": " + leaderboard[i].score + "<br>"; }
 document.getElementById('leaderboard').innerHTML = '<strong>Leaderboard:</strong><br>' + string; }) 
function clearLeaderboard(){ socket.emit('clear', password); } 
