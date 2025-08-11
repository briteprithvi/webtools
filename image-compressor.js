const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');

let uploadedImage = null;

// Update compression value text
qualitySlider.addEventListener('input', () => {
  qualityValue.textContent = qualitySlider.value;
});

// Handle image upload and preview
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

// Compress and download image
compressBtn.addEventListener('click', function () {
  if (!uploadedImage) {
    alert('Please upload an image first.');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.width = uploadedImage.naturalWidth;
  canvas.height = uploadedImage.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(uploadedImage, 0, 0);

  const quality = parseFloat(qualitySlider.value);

  // Default to JPEG for compression
  canvas.toBlob(
    (blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'compressed-image.jpg';
      link.click();
    },
    'image/jpeg',
    quality
  );
});
