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

// Some JavaScript to load the image and show the form. There is no actual backend functionality. This is just the UI

// const form = document.querySelector('#img-form');

// function loadImage(e) {
//   const file = e.target.files[0];

//   if (!isFileImage(file)) {
//       alert('Please select an image file');
//         return;
//   }

//   form.style.display = 'block';
//   document.querySelector(
//     '#filename'
//   ).innerHTML = file.name;
// }

// function isFileImage(file) {
//     const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
//     return file && acceptedImageTypes.includes(file['type'])
// }

// document.querySelector('#img').addEventListener('change', loadImage);
