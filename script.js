const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const convertBtn = document.getElementById('convertBtn');
const formatSelect = document.getElementById('formatSelect');

let uploadedImage = null;

imageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      uploadedImage = img;
      previewContainer.innerHTML = '';
      previewContainer.appendChild(img);
    };
  };
  reader.readAsDataURL(file);
});

convertBtn.addEventListener('click', function () {
  if (!uploadedImage) {
    alert('Please upload an image first.');
    return;
  }

  const format = formatSelect.value;

  const canvas = document.createElement('canvas');
  canvas.width = uploadedImage.naturalWidth;
  canvas.height = uploadedImage.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(uploadedImage, 0, 0);

  canvas.toBlob(
    (blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `converted-image.${format.split('/')[1]}`;
      link.click();
    },
    format,
    0.8 // compression quality (0.0 to 1.0)
  );
});
