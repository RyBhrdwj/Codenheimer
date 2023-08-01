const video = document.querySelector("video");
const screen = document.querySelector(".screen");
const lastFrame = document.querySelector("img.background");
const launch = document.querySelector(".launch");
const loadingDiv = document.querySelector(".loading");
const screen1 = document.querySelectorAll(".screen-1");

console.log(window.innerWidth);
if (window.innerWidth < 1200) {
  showScreen();
  lastFrame.parentElement.removeChild(lastFrame);
  video.parentElement.removeChild(video);
}

function showScreen() {
  video.classList.add("hide");
  lastFrame.classList.remove("hide");
  screen.classList.remove("hide");
}

video.addEventListener("ended", () => {
  showScreen();
});

function displayMessage() {
  const code = document.querySelector("input").value.toLowerCase();
  fetch(`https://codenheimer-api.onrender.com/code/?code=${code}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const isWinner = data;
      if (isWinner == false) {
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
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }, 2000);
      } else {
        window.location.href = isWinner[0];
      }
    });
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
