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

const hoursInput = document.getElementById("hours-input");
const minsInput = document.getElementById("mins-input");
const secsInput = document.getElementById("secs-input");

const enterButton = document.getElementById("set-time-button");
const buttonRow = document.getElementById("button-row");
const hideContainer = document.getElementById("hider-container");

startButton.addEventListener('click', StartPause);

downButton.addEventListener('click', function(){Increment(-1)}, false); //this works?
dblDownButton.addEventListener('click', function(){Increment(-10)}, false);
dblDownButton.addEventListener("contextmenu", function(){Increment(-60)}, false); //right click for 1 hour

upButton.addEventListener('click', function(){Increment(1)}, false);
dblUpButton.addEventListener('click', function(){Increment(10)}, false);
dblUpButton.addEventListener("contextmenu", function(){Increment(60);}, false); //was 30s 10m, 1h

resetButton.addEventListener('click', ResetButton);

enterButton.addEventListener("click", SetNewTime, false);

document.addEventListener("DOMContentLoaded", Initialize); //run init on first load

function Initialize()
{
    console.log("initialize");
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
        //add/remove with classList as classes used for layout also
        buttonRow.classList.remove("canTweak");
        hideContainer.classList.add("hidden");
    }
    else
    {
        PauseCount();
        startButton.className = "";
        startButton.innerHTML = "start";
        resetButton.className = "yellow";
        buttonRow.classList.add("canTweak");
        hideContainer.classList.remove("hidden");
    }
}

function ResetButton()
{
    if(countActive){return;}
    Initialize();
    startButton.className = "";
    startButton.innerHTML = "start";
}

function Increment(value) //how to incrememnt starting time
{
    if(countActive) return; //removed || time != startingSeconds by request.. but not right effect.. yet
    //startingSeconds+=value;
    time += value;
    ValidateTime();
    DisplayTime();
    //Initialize();
}

function ValidateTime()
{
    startingSeconds = startingSeconds <=0 ? 0 : startingSeconds;
    startingSeconds = startingSeconds >= maxTime ? maxTime : startingSeconds;
}

function SetNewTime()
{
    if (countActive) return;
    let newStartTime = CheckInputs(hoursInput, true) * 60 * 60 + CheckInputs(minsInput) * 60 + CheckInputs(secsInput);
    if (newStartTime == 0) return;
    startingSeconds = newStartTime;
    ValidateTime();
    Initialize();
}

function CheckInputs(input, isHours = false)
{
    let checkMe = input.value;
    //checkMe = checkMe.replace(/\b(0(?!\b))+/g, "");
    checkMe = parseInt(checkMe, 10);
    //checkMe = checkMe * 1;
    //console.log("input = ", {value: checkMe});

    //validate input is number
    if (isNaN(checkMe)) 
    {
        //console.log("input is NaN!! - ", {value: checkMe});
        checkMe = 0;
        return input.value = checkMe;
    }
    //else console.log("input is valid: ", {value: checkMe});

    //validate is within expected bounds
    if (checkMe < 0) 
    {
        checkMe = 0;
        return input.value = checkMe;
    }

    else if (checkMe > 24 && isHours) 
    {
        checkMe = 24;
        return input.value = checkMe;
    }
    else if (checkMe > 59)
    {
        checkMe = 59;
        return input.value = checkMe;
    }
    else return input.value = checkMe;
}