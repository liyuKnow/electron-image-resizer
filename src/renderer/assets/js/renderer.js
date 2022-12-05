const { ipcRenderer } = require("electron");

const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileAcceptedImage(file)) {
    toastAlert(
      "Please select a valid image with types .jpeg, .jpg or .png!",
      "error"
    );
    return;
  }
  // Get original dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  form.style.display = "block";
  filename.innerText = file.name;

  outputPath.innerText = path.join(os.homedir(), "Image-resizer");
}

function sendImage(e) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[o].path;

  if (!img.files[0]) {
    toastAlert(
      "Please select a valid image with types .jpeg, .jpg or .png!",
      "error"
    );
    return;
  }

  if (width === "" && height === "") {
    toastAlert("Please fill in a height and width", "error");
    return;
  }
  // IPC SEND IMAGE
  ipcRenderer.send("image:resize", {
    width,
    height,
    imgPath,
  });
}

// make sure if file is image
function isFileAcceptedImage(file) {
  const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
}

function toastAlert(message, alertType) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: alertType == "success" ? "green" : "red",
      color: "white",
      textAlign: "center",
    },
  });
}

img.addEventListener("change", loadImage);

form.addEventListener("change", sendImage);

// ======================================================================================================

// const minimize_btn = document.querySelector("#minimize");

// function minimizeWindow() {
//   console.log("minimize this!");
// }

// minimize_btn.addEventListener("click", minimizeWindow);

// console.log(`versions.node() => ${versions.node()}`);
// console.log(`versions.electron() => ${versions.electron()}`);
// console.log(`versions.node() => ${versions.node()}`);
// console.log(`versions.platform() => ${versions.platform()}`);

// console.log(`os.homedir() => ${os.homedir()}`);
// console.log(`os.cwd() => ${os.cwd()}`);
