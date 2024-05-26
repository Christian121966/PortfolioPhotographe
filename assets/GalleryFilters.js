// GalleryFilters.js
import { AnimationManager } from './AnimationManager.js';

export class GalleryFilters {
    constructor(selector) {
        this.galleryElement = document.querySelector(selector);
        if (!this.galleryElement) {
            console.error("Élément de galerie non trouvé");
            return;
        }
        this.animationManager = new AnimationManager(selector);
        this.buttons = this.galleryElement.querySelectorAll('.gallery-button');
        this.pictures = this.galleryElement.querySelectorAll('.picture-item');
        this.initFilters();
    }

    initFilters() {
        this.buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        this.pictures.forEach((picture) => {
            const img = picture.querySelector('img');
            const galleryTags = img.getAttribute('data-gallery-tag').split(', ').map(tag => tag.trim().toLowerCase());
            if (filter.toLowerCase() === 'tous' || galleryTags.includes(filter.toLowerCase())) {
                picture.style.display = ''; // Afficher l'image
                this.animationManager.addAnimation(img); // Appliquer l'animation
            } else {
                picture.style.display = 'none'; // Masquer l'image
            }
        });
    }
}


// Initialisation de la galerie de filtres
document.addEventListener('DOMContentLoaded', () => {
    const galleryFilters = new GalleryFilters('.gallery'); // Utilisez le sélecteur correct pour votre galerie
});
