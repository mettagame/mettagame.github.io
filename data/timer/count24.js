let startingSeconds = 600;
let time = startingSeconds;
let countActive = false;
let updateLoop;
const maxTime = 60*60*24; //24h max timer

const countdownElement = document.getElementById('countdown');
const startButton = document.getElementById("start-button");

const dblDownButton = document.getElementById("down-down-button");
const downButton = document.getElementById("down-button");
const upButton = document.getElementById("up-button");
const dblUpButton = document.getElementById("up-up-button");

const resetButton = document.getElementById("reset-button");

startButton.addEventListener('click', StartPause);

downButton.addEventListener('click', function(){Increment(-30)}, false); //this works?
dblDownButton.addEventListener('click', function(){Increment(-600)}, false);
dblDownButton.addEventListener("contextmenu", function(){Increment(-3600)}, false); //right click for 1 hour

upButton.addEventListener('click', function(){Increment(30)}, false);
dblUpButton.addEventListener('click', function(){Increment(600)}, false);
dblUpButton.addEventListener("contextmenu", function(){Increment(3600);}, false);

resetButton.addEventListener('click', ResetButton);

document.addEventListener("DOMContentLoaded", Initialize); //run init on first load

function Initialize()
{
    time = startingSeconds;
    countActive = false;
    resetButton.className = "";
    countdownElement.style.color = "white";
    DisplayTime();
}

function StartCount()
{
    countActive = true;
    updateLoop = setInterval(CounterUpdateLoop, 1000);
}

function PauseCount()
{
    countActive = false;
    clearInterval(updateLoop);
}

function CounterUpdateLoop() //updates at 1000ms
{
    DisplayTime();
    Countdown();
}

function Countdown()
{
    time--;

    if (time <= 60)
    {
        if (time <=10)
        {
            if (time <= 0)
            {
                TimeUp();
            }
            else {TimeVeryLow();}
        }
        else {TimeLow()};
    }     
}

function DisplayTime()
{
    let secs = time % 60;
    let mins = Math.floor(time / 60);
    let hours = Math.floor(time / 60 / 60);

    if (hours > 0)
    {
        mins -= hours * 60;
        if (mins < 10)
        {
            mins = "0" + mins; //add 0 for single digit mins when paired with hours
        }
    }

    if (time > 11)
    {
        secs = secs < 10 ? "0" + secs : secs; //same for seconds under 10 except last
    }
   
    //display formatting:

    if (hours > 0) //only display hours/mins if relevant
    {
        countdownElement.innerHTML = `${hours}:${mins}:${secs}`;
        if (hours >= 10) { countdownElement.className = "doubleDigitHours"; } //class name controls size
        else { countdownElement.className = "hours"; } 
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
}

function TimeVeryLow()
{
    countdownElement.style.color = "red";
}

function TimeLow()
{
    countdownElement.style.color = "yellow";
}

function StartPause()
{
    if (!countActive)
    {
        StartCount();
        startButton.className = "red";
        startButton.innerHTML = "stop";
        resetButton.className = "";
    }
    else
    {
        PauseCount();
        startButton.className = "";
        startButton.innerHTML = "start";
        resetButton.className = "yellow";
    }
}

function ResetButton()
{
    if(countActive){return;}
    Initialize();
    startButton.className = "";
    startButton.innerHTML = "start";
}

function Increment(value)
{
    if(countActive || time != startingSeconds) return;
    startingSeconds+=value;
    ValidateTime();
    Initialize();  
}

function ValidateTime()
{
    startingSeconds = startingSeconds <=0 ? 0 : startingSeconds;
    startingSeconds = startingSeconds >= maxTime ? maxTime : startingSeconds;
}