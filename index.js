let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitOutput = document.getElementById("bits");
let kboutput = document.getElementById("kbs");
let mboutput = document.getElementById("mbs");
let statusoutput = document.getElementById("status");
let imageLink = "https://source.unsplash.com/random?topics-gradient";
image.onload = async function () {
  endTime = new Date().getTime();

  await fetch(imageLink).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

function calculateSpeed() {
  let timeDuration = (endTime - startTime) / 1000;
  let loadedBits = imageSize * 8;
  let speedInBps = (loadedBits / timeDuration).toFixed(2);
  let speedInKbps = (speedInBps / 1024).toFixed(2);
  let speedInMbps = (speedInKbps / 1024).toFixed(2);

  if (speedInMbps >= 1.0) {
    statusoutput.innerHTML +=
      "<p style='display: flex; justify-content: center; align-items: center; gap: 10px'>You have a <span style='color: green'>Good</span> network<p>";
  } else if (speedInMbps >= 0.5) {
    statusoutput.innerHTML +=
      "<p style='display: flex; justify-content: center; align-items: center; gap: 10px'>You have a<span style='color: yellow'>Medium</span>network<p>";
  } else {
    statusoutput.innerHTML +=
      "<p style='display: flex; justify-content: center; align-items: center; gap: 10px'>You have a<span style='color: red'>Bad</span>network<p>";
  }
  if (speedInBps) {
    document.getElementById("loadhidebp").style.display = "none";
  } 
  
  if (speedInKbps) {
    document.getElementById("loadhidekb").style.display = "none";
  } 
  
  if (speedInMbps) {
    document.getElementById("loadhidemb").style.display = "none";
  }

  bitOutput.innerHTML += `${speedInBps}`;
  kboutput.innerHTML += `${speedInKbps}`;
  mboutput.innerHTML += `${speedInMbps}`;
}

const init = async () => {
  startTime = new Date().getTime();
  image.src = imageLink;
};
window.onload = () => init();
