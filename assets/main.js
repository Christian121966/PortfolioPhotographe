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