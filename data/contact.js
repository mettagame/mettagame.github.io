const formElement = document.getElementById("form");

formElement.addEventListener("submit", SubmitForm, false); //some people do function() {SubmitForm(e);} but why what is the purpose what does e represent? event? what event?

document.addEventListener("DOMContentLoaded", HelloWorld); //run hw on first load

function HelloWorld()
{
    console.log("hello world");
}

function SubmitForm(e) //why e what is this for why is nobody ever explicit?!
{
    console.log("I pressed submit!");

    e.preventDefault(); //what is this?!?!
    
    let name = getElementValue("nameInput");
    let email = getElementValue("emailInput");
    let message = getElementValue("messageInput");

    console.log("submitting data -- ", {name, email, message});

}

const getElementValue = (id) => 
{ 
    return document.getElementById(id).value; 
};