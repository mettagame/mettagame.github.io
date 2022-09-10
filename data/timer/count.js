/*var startingMinutes = 10;*/
var startingSeconds = 600;
let time = startingSeconds; /* startingMinutes * 60; */
var paused = true;
var countActive = false;

const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById("start-button");

const dblDownButton = document.getElementById("down-down-button");
const downButton = document.getElementById("down-button");
const upButton = document.getElementById("up-button");
const dblUpButton = document.getElementById("up-up-button");

const resetButton = document.getElementById("reset-button");

startButton.addEventListener('click', StartPause);

downButton.addEventListener('click', MinusTen);
dblDownButton.addEventListener('click', MinusSixty);

upButton.addEventListener('click', AddTen);
dblUpButton.addEventListener('click', AddSixty);

resetButton.addEventListener('click', ResetButton);

setInterval(UpdateCountdown, 1000);  // run UpdateCountdown every 1000ms

document.addEventListener("DOMContentLoaded", Initialize); //run init on first load

function Initialize()
{
    time = startingSeconds; /* startingMinutes * 60; */
    paused = true;
    countActive = false;
    countdownElement.style.color = "white";
    DisplayTime();
}

function UpdateCountdown() //updates at 1000ms
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
    
    if (time <= 30)
    {
        if (time <=0)
        {
            TimeUp();
        }
        else {TimeLow()};
    }   
    
}

function DisplayTime()
{
    let mins = Math.floor(time / 60);
    let hours = Math.floor(time / 60 / 60);
    if (hours > 0)
    {
        mins -= hours * 60;
    }

    let secs = time % 60;
    
    if (hours > 0 && mins < 10) //add 0 for single digit mins if hours counted
    {
        mins = "0" + mins;
    }

    secs = secs < 10 ? "0" + secs : secs; //same for seconds under 10 at all times
    
    
    if (hours > 0) //only display hours if relevant
    {
        countdownElement.innerHTML = `${hours}:${mins}:${secs}`;
        countdownElement.className = "hours";
    }
    else if (mins > 0)
    {
        countdownElement.innerHTML = `${mins}:${secs}`;
        countdownElement.className = "minutes";
    }
    else
    {
        countdownElement.innerHTML = `${secs}`;
        countdownElement.className = "seconds";
   
    }
    
    
}

function TimeUp()
{
    time = 0;
    running = false;
    countdownElement.style.color = "red";
}

function TimeLow()
{
    countdownElement.style.color = "yellow";
}

function StartPause()
{
    countActive = true;
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
    countActive = false;
    Initialize();
    startButton.className = "";
    startButton.innerHTML = "start";
}


function AddTen()
{
    Increment(30);
}

function AddSixty()
{
    Increment(600);
}

function MinusTen()
{
    Increment(-30);
}

function MinusSixty()
{
    Increment(-600);
}

function Increment(value)
{
    if(paused && !countActive)
    {
        startingSeconds+=value;
        ValidateTime();
        Initialize();
    }
}

function ValidateTime()
{
    startingSeconds = startingSeconds <=0 ? 0 : startingSeconds;
    startingSeconds = startingSeconds >= 120*60 ? 120*60 : startingSeconds;
}