
class Carousel {
  constructor(selector) {
    this.carouselElement = document.querySelector(selector);
    this.items = this.carouselElement.querySelectorAll('.carousel-item');
    this.totalItems = this.items.length;
    this.indicators = this.carouselElement.querySelectorAll('.carousel-indicators button');
    this.currentIndex = 0;
    this.initControls();
    this.startAutoRotate();
  }

  initControls() {
    this.carouselElement.querySelector('.carousel-control-next').addEventListener('click', () => {
      this.changeItem((this.currentIndex + 1) % this.totalItems);
    });

    this.carouselElement.querySelector('.carousel-control-prev').addEventListener('click', () => {
      this.changeItem((this.currentIndex - 1 + this.totalItems) % this.totalItems);
    });

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.changeItem(index));
    });
  }

  changeItem(newIndex) {
    this.items.forEach((item) => item.classList.remove('active'));
    this.indicators.forEach((indicator) => indicator.classList.remove('active'));

    this.items[newIndex].classList.add('active');
    this.indicators[newIndex].classList.add('active');
    this.currentIndex = newIndex;
  }

  startAutoRotate() {
    setInterval(() => {
      this.changeItem((this.currentIndex + 1) % this.totalItems);
    }, 5000);
  }
}

class GalleryFilters {
  constructor(selector) {
    this.galleryElement = document.querySelector(selector);
    this.buttons = this.galleryElement.querySelectorAll('.gallery-button');
    this.pictures = this.galleryElement.querySelectorAll('.picture-item');
    this.initFilters();
  }

  initFilters() {
    this.buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.applyFilter(filter, button);
      });
    });
  }

  applyFilter(filter, selectedButton) {
    this.buttons.forEach((btn) => btn.classList.remove('selected-filter'));
    selectedButton.classList.add('selected-filter');

    this.pictures.forEach((picture) => {
      picture.style.display = filter === 'tous' || picture.querySelector('img').dataset.galleryTag.includes(filter) ? 'block' : 'none';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carousel = new Carousel('.carousel');
  const galleryFilters = new GalleryFilters('.gallery');

  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      observer.observe(img);
    });
  }
});

