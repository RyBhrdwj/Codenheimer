async function checkCode()
{
    const inputElement = document.querySelector("input");
    const code = inputElement.value.toLowerCase();

    try {
        const response = await fetch(`https://codenheimer-api.onrender.com/code/?code=${code}`);
        const data = await response.json();
        return data;

    } catch (error) {
        const screen = document.querySelector(".screen");
        screen.innerHTML = '';

        const mssg = document.createElement("h2");
        mssg.textContent = "An Error Occured";
        screen.appendChild(mssg);
    }
}

async function displayMessage()
{
    const isWinner = await checkCode();
    const screen = document.querySelector(".screen");

    screen.innerHTML = '';

    const mssg = document.createElement("h2");

    if (isWinner === false)
    {
        mssg.textContent = "FUCK YOU !!!";
    }
    else
    {
        mssg.textContent = `Congratulations ! You've got ${isWinner} Place.`;
    }

    screen.appendChild(mssg);
}

// Display message is called if either enter is pressed or when input field is completely filled.

document.addEventListener("keydown", async (event) => {
    if (event.key === "Enter")
    {
        event.preventDefault();
        await displayMessage();
    }
});

document.addEventListener("input", (event) => {
    const inputElement = event.target;
    const maxLength = inputElement.getAttribute("maxlength");
    const inputValue = inputElement.value;
  
    if (inputValue.length >= maxLength) {
      displayMessage();
    }
});
