document.getElementById('mode-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  // Update button text as needed
  if (document.body.classList.contains('dark-mode')) {
    this.textContent = 'Light Mode';
  } else {
    this.textContent = 'Dark Mode';
  }
});
// JavaScript for Carousel Functionality
const carouselInner = document.querySelector('.carousel-inner');
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');
const totalSlides = document.querySelectorAll('.project-slide').length;
let currentSlide = 0;

function updateCarousel() {
  carouselInner.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
}

rightArrow.addEventListener('click', () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  }
});

leftArrow.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});
