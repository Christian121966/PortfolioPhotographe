// AnimationManager.js
export class AnimationManager {
    constructor(selector) {
        this.galleryElement = document.querySelector(selector);
        if (!this.galleryElement) {
            console.error("Élément de galerie non trouvé");
            return;
        }
        this.pictures = this.galleryElement.querySelectorAll('.picture-item img');
        this.setupAnimationListeners();
    }

    setupAnimationListeners() {
        this.pictures.forEach(img => {
            img.addEventListener('animationend', () => {
                img.classList.remove('gallery-open');
            });
        });
    }

    addAnimation(img) {
        requestAnimationFrame(() => {
            img.classList.add('gallery-open');
        });
    }
}