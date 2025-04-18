const closeButtons = document.getElementsByClassName("windowclose");
const startButton = document.getElementById("start");

function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeCard = document.getElementById("timeData");
  timeCard.innerText = currentTime;
}

updateTime();
setInterval(updateTime, 1000);

dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.querySelectorAll('button.windowclose').forEach(function(button) {
  button.onclick = () => {
    const etc = button.id.split("close")[0];
    const ele = document.getElementById(etc);

    ele.remove();
  }
});

// for (const button in closeButtons) {
//   button.onclick = () => {
//     const etc = button.id.split("close")[0];
//     const ele = document.getElementById(etc);

//     ele.remove();
//   }
// }

function openWindow(title, body, opts = {}) {
  opts.width = (typeof opts.width === "number" ? `${opts.width}px` : opts.width && !opts.width.endsWith("px") ? `${opts.width}px` : opts.width);
  opts.height = (typeof opts.height === "number" ? `${opts.height}px` : opts.height && !opts.height.endsWith("px") ? `${opts.height}px` : opts.height);

  const windowMain = document.createElement("div");
  windowMain.id = Date.now();
  windowMain.className = "window";

  const windowhead = document.createElement("div");
  windowhead.id = windowMain.id + "header";
  windowhead.className = "windowhead";

  const headbody = document.createElement("p");
  headbody.innerText = title;
  headbody.className = "title";

  const headbtn = document.createElement("button");
  headbtn.id = windowMain.id + "close";
  headbtn.className = "windowclose";
  headbtn.innerText = "X";

  const container = document.createElement("div");
  container.className = "body";
  container.innerHTML = body;
  container.style.width = opts?.width || "360px";
  container.style.height = opts?.height || "auto";
  container.style.margin = opts?.margin || "6px";

  windowhead.append(headbody);
  windowhead.append(headbtn);
  windowMain.append(windowhead);
  windowMain.append(container);

  document.body.appendChild(windowMain);

  dragElement(windowMain);
  document.querySelectorAll('button.windowclose').forEach(function(button) {
    button.onclick = () => {
      const etc = button.id.split("close")[0];
      const ele = document.getElementById(etc);
  
      ele.remove();
    }
  });
}

async function openStartMenu() {
  const requestForStartHTML = await fetch("assets/other/startMenu.html");
  const startMenuHTML = await requestForStartHTML.text();

  openWindow("KelpOS", startMenuHTML);
}