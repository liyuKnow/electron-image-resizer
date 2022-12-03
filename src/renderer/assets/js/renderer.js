const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

function loadImage(e) {
  const file = e.target.files[0];

  if (!isFileAcceptedImage(file)) {
    alert("ePlease select a valid image with types .jpeg, .jpg or .png!");
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
}

// make sure if file is image
function isFileAcceptedImage(file) {
  const acceptedImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
}

img.addEventListener("change", loadImage);
