var startingMinutes = 10;
let time = startingMinutes * 60;
var paused = true;

const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById("start-button");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");
const resetButton = document.getElementById("reset-button");

startButton.onclick = function(){StartButton()};
upButton.onclick = function(){AddMinute()};
downButton.onclick = function(){RemoveMinute()}
resetButton.onclick = function(){ResetButton()};

setInterval(UpdateCountdown, 1000); 
// run UpdateCountdown every 1000ms

function Initialize()
{
    time = startingMinutes * 60;
    paused = true;
    DisplayTime();
}

function UpdateCountdown()
{
    if(!paused)
    {
        Countdown();
    }
}

function Countdown()
{
    DisplayTime();
    time--;
    if (time <= 0)
    {
        TimeUp();
    }
}

function DisplayTime()
{
    const mins = Math.floor(time / 60);
    let secs = time % 60;
    secs = secs < 10 ? "0" + secs : secs;
    countdownElement.innerHTML = `${mins}:${secs}`;
}

function TimeUp()
{
    time = 0;
    running = false;
    countdownElement.style.color = "red";
}

function StartButton()
{
    paused = !paused;
    if (paused)
    {
        startButton.className = "";
        startButton.innerHTML = "start";
    }
    else
    {
        startButton.className = "red";
        startButton.innerHTML = "stop";
    }
}

function ResetButton()
{
    Initialize();
    startButton.className = "";
    startButton.innerHTML = "start";
}

function AddMinute()
{
    if(paused)
    {
        startingMinutes++;
        Initialize();
    }
}

function RemoveMinute()
{
    if(paused)
    {
        if (startingMinutes > 1){
            startingMinutes--;  
            Initialize();     
        }
    }
}
