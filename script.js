/* script.js */

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuToggle.addEventListener('click', function() {
  nav.classList.toggle('active');
  menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

// Modal Popup (Enabled only on laptops/desktops)
const projectImages = document.querySelectorAll('.project img');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

projectImages.forEach(img => {
  img.addEventListener('click', function() {
    if (window.matchMedia("(min-width: 769px)").matches) {
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      const project = this.closest('.project');
      modalTitle.textContent = project.querySelector('h3').textContent;
      modalDescription.textContent = project.querySelector('p').textContent;
      modal.classList.add('active');
    }
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Carousel Functionality with Touch Support
document.addEventListener('DOMContentLoaded', function() {
  const carouselInner = document.querySelector('.carousel-inner');
  const slides = document.querySelectorAll('.project-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  document.querySelector('.carousel-arrow.right').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  document.querySelector('.carousel-arrow.left').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  // Touch events for swipe
  carouselInner.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselInner.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50 && currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else if (swipeDistance < -50 && currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  // Animate Projects and Pricing on Load
  const projectGrids = document.querySelectorAll('.project-grid');
  const pricingGrid = document.querySelector('.pricing-grid');
  
  projectGrids.forEach(grid => {
    gsap.fromTo(grid, { opacity: 0, y: 20 }, { 
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      ease: 'power2.out', 
      stagger: 0.1 
    });
  });

  if (pricingGrid) {
    console.log('Pricing grid found, animating...');
    gsap.fromTo(pricingGrid, { opacity: 0, y: 20 }, { 
      opacity: 1, 
      y: 0, 
      duration: 0.7, 
      ease: 'power2.out',
      stagger: 0.1 
    });
  }
});

// Contact Form Animation
const contactForm = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  contactForm.classList.add('fade-out');
  setTimeout(() => {
    contactForm.style.display = 'none';
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
      contactForm.style.display = 'block';
      contactForm.classList.remove('fade-out');
      contactForm.reset();
    }, 3000);
  }, 1000);
  fetch(contactForm.action, {
    method: 'POST',
    body: new FormData(contactForm),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    console.log('Form submitted successfully');
  }).catch(error => {
    console.error('Form submission error:', error);
  });
});