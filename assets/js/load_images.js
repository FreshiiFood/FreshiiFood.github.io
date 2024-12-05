// List of image filenames in the 'gallery' folder (relative to 'assets/img/gallery')
const imageNames = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
  'image4.jpg',
  'image5.jpg'
];

// Function to load images dynamically into the gallery
const loadGallery = () => {
  const galleryContainer = document.getElementById('gallery-items');

  imageNames.forEach(imageName => {
    // Create the gallery item HTML
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('col-lg-3', 'col-md-4');
    galleryItem.innerHTML = `
      <div class="gallery-item">
        <a href="assets/img/gallery/${imageName}" class="gallery-lightbox" data-gall="gallery-item">
          <img src="assets/img/gallery/${imageName}" alt="${imageName}" class="img-fluid">
        </a>
      </div>
    `;

    // Append the gallery item to the container
    galleryContainer.appendChild(galleryItem);
  });

  // Initialize GLightbox for the lightbox functionality
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });
};

// Load the gallery when the page loads
window.addEventListener('load', loadGallery);
