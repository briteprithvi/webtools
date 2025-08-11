const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const resizeBtn = document.getElementById('resizeBtn');
const downloadBtn = document.getElementById('downloadBtn');

let originalImage = null;

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      originalImage = img;
      previewContainer.innerHTML = '';
      previewContainer.appendChild(img);
      widthInput.value = img.naturalWidth;
      heightInput.value = img.naturalHeight;
      downloadBtn.style.display = 'none';
    };
  };
  reader.readAsDataURL(file);
});

resizeBtn.addEventListener('click', function () {
  if (!originalImage) {
    alert('Please upload an image first.');
    return;
  }

  const newWidth = parseInt(widthInput.value);
  const newHeight = parseInt(heightInput.value);

  if (!newWidth || !newHeight || newWidth <= 0 || newHeight <= 0) {
    alert('Please enter valid width and height.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

  const resizedImageUrl = canvas.toDataURL('image/png');

  const resizedImg = new Image();
  resizedImg.src = resizedImageUrl;
  previewContainer.innerHTML = '';
  previewContainer.appendChild(resizedImg);

  downloadBtn.href = resizedImageUrl;
  downloadBtn.style.display = 'inline-block';
});
