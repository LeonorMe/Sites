let btnStart = document.querySelector(".start");
let showTime = document.querySelector(".show-time");
var btnStop = document.querySelector(".stop");

let workTime = '45';
let restTime = '15';
//new Date(year, monthIndex, day, hours, minutes, seconds)

btnStart.addEventListener('click', () => {
    btnStart.classList = "stop";
    btnStart.innerHTML = "Stop";
    btnStop = document.querySelector(".stop");
    
    console.log('start');
    
    let min = workTime;
    let sec = 59;
    setInterval(function () {
        showTime.innerHTML = min + ':' + showSec(sec);
        sec = (60 + sec - 1) % 60;
    }, 1000);

    setInterval(function () {
        showTime.innerHTML = min + ":" + sec;
        min--;
        sec = (60 + sec - 1) % 60;
    }, 60 * 1000);

    setTimeout(function () {
        alert("Work time ended")
    }, min * 60 *1000);

    /*
    time = restTime;
    hour = time.substring(0, 2);
    min = time.substring(3, 4);
    setTimeout(function () {
        //alert("Time is over");
        setInterval(function () {
            showTime.innerHTML = hour + ":" + min;
            min--;
        }, 10000);
    }, hour * 60000); */
});
/*
btnStop.addEventListener('click', () => {
    btnStop.classList = "start";
    btnStop.innerHTML = "Start";
    btnStop = document.querySelector(".start");
})+/


/*clearTimeout();*/

function showSec(s){
    if(s < 10)
        return '0' + s;
    else
        return s;
}


function newTime(){
    workTime = document.getElementById("work-time").value.substring(3, 5);
    restTime = document.getElementById("rest-time").value.substring(3, 5);
    
    showTime.innerHTML = workTime;
    
    console.log("update time to (", workTime, ", ", restTime, ")");
}