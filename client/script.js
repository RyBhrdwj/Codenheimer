const video = document.querySelector("video");
const screen = document.querySelector(".screen");
const lastFrame = document.querySelector("img.background");
const launch = document.querySelector(".launch");
const loadingDiv = document.querySelector(".loading");
const screen1 = document.querySelectorAll(".screen-1");

video.addEventListener("ended", () => {
  video.classList.add("hide");
  lastFrame.classList.remove("hide");
  screen.classList.remove("hide");
});

async function checkCode() {
  const inputElement = document.querySelector("input");
  const code = inputElement.value.toLowerCase();

  try {
    const response = await fetch(
      `https://codenheimer-api.onrender.com/code/?code=${code}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = "";

    const mssg = document.createElement("h2");
    mssg.textContent = "An Error Occured";
    screen.appendChild(mssg);
  }
}

async function displayMessage() {
  const isWinner = await checkCode();
  if (isWinner == false) {
    const screen = document.querySelector(".screen");
    screen.innerHTML = "";

    const mssg = document.createElement("h2");
    mssg.classList.add("wrong");
    mssg.textContent = "Invalid Code";

    const msg2 = document.createElement("p");
    msg2.textContent = "Get Rickrolled now!";
    msg2.classList.add("wrong-2");
    screen.appendChild(mssg);
    screen.appendChild(msg2);
    setTimeout(() => {
      window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 2000);
  } else {
    window.location = isWinner;
  }
}

// Display message is called if either enter is pressed or when input field is completely filled.

launch.addEventListener("click", (event) => {
  screen1.forEach((screen) => {
    screen.classList.add("hideNone");
  });
  loadingDiv.classList.remove("hideNone");
  loadingDiv.classList.add("animated");
  loadingDiv.addEventListener("animationend", displayMessage);
});

// document.addEventListener("input", (event) => {
//   const inputElement = event.target;
//   const maxLength = inputElement.getAttribute("maxlength");
//   const inputValue = inputElement.value;

//   if (inputValue.length >= maxLength) {
//     displayMessage();
//   }
// });
