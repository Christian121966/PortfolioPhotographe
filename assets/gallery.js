
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

  /**
   * Represents a gallery filter functionality to filter gallery items based on user selection and display images in a modal view.
   */
  // class GalleryFilters {
      /**
       * Initializes the GalleryFilters class with the provided selector.
       * @param {string} selector - The selector for the gallery container.
       */
      constructor(selector) {
        this.galleryElement = document.querySelector(selector);
        this.buttons = this.galleryElement.querySelectorAll('.gallery-button');
        this.pictures = this.galleryElement.querySelectorAll('.picture-item');
        this.modal = document.querySelector("#modal-picture");
        this.modalImage = this.modal.querySelector(".modal-picture img");
        this.modalClose = this.modal.querySelector(".close-modal");
        this.initFilters();
        this.setupModal();
      }
  
      /**
       * Sets up event listeners on filter buttons to apply filters.
       */
      initFilters() {
        this.buttons.forEach((button) => {
          button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            this.applyFilter(filter, button);
          });
        });
      }
  
      /**
       * Applies the selected filter to gallery items and updates the UI.
       * @param {string} filter - The filter to be applied.
       * @param {Element} selectedButton - The selected filter button element.
       */
      applyFilter(filter, selectedButton) {
        this.buttons.forEach((btn) => btn.classList.remove('selected-filter'));
        selectedButton.classList.add('selected-filter');
  
        this.pictures.forEach((picture) => {
          picture.style.display = filter === 'tous' || picture.querySelector('img').dataset.galleryTag.includes(filter) ? 'block' : 'none';
        });
      }
  
      /**
       * Configures event listeners for opening and closing the modal.
       */
      setupModal() {
        this.pictures.forEach(picture => {
          picture.addEventListener('click', () => {
            this.openModal(picture);
          });
        });
  
        this.modalClose.addEventListener('click', () => {
          this.closeModal();
        });
  
        this.modal.addEventListener('click', (event) => {
          if (event.target === this.modal) {
            this.closeModal();
          }
        });
      }
  
      /**
       * Displays the modal with the selected picture.
       * @param {Element} picture - The selected picture element.
       */
      openModal(picture) {
        const img = picture.querySelector('img');
        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
        this.modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
  
      /**
       * Hides the modal and restores page scrollability.
       */
      closeModal() {
        this.modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }