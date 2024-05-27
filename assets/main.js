// main.js
import { Carousel } from './Carousel.js';
import { GalleryFilters } from './GalleryFilters.js';
import { Modal } from './Modal.js';
import { AnimationManager } from './AnimationManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel('#carouselExampleIndicators');
    const galleryFilters = new GalleryFilters('#gallery');
    const modal = new Modal('#modal-picture');
    const animationManager = new AnimationManager('#gallery');
});

// main.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = new Modal('#modal-picture');
    const gallery = document.querySelector('#gallery');

    // Utilisation de la délégation d'événements
    gallery.addEventListener('click', (event) => {
        const pictureItem = event.target.closest('.picture-item');
        if (pictureItem) {
            const imgElement = pictureItem.querySelector('img'); // Assurez-vous que c'est le bon sélecteur pour l'image
            if (imgElement) {
                modal.openModal(imgElement);
            }
        }
    })});