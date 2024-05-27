export class Modal {
    constructor(selector) {
        // Sélectionner l'élément modal principal et les composants internes
        this.modalElement = document.querySelector(selector);
        this.modalContent = this.modalElement.querySelector(".modal-content");
        this.modalPicture = this.modalElement.querySelector(".modal-picture");
        this.selectorCloseModal = this.modalElement.querySelector(".close");
        this.rightArrow = this.modalElement.querySelector(".modal-arrow-right");
        this.leftArrow = this.modalElement.querySelector(".modal-arrow-left");

        // Initialiser l'index de l'image courante et mettre à jour la liste des images visibles
        this.currentImageIndex = 0;
        this.updateVisiblePictures();

        // Configurer les événements pour la modal
        this.setupModal();
    }

    // Mettre à jour la liste des images visibles en fonction du filtrage
    updateVisiblePictures() {
        // Sélectionner uniquement les images visibles dans la galerie
        this.allPicture = Array.from(document.querySelectorAll(".gallery .picture-item img"))
                               .filter(img => img.offsetParent !== null);
        this.currentImageIndex = 0; // Réinitialiser l'index à chaque mise à jour
    }

    setupModal() {
        // Ajouter un écouteur d'événements pour chaque image visible pour ouvrir la modal
        this.allPicture.forEach((picture, index) => {
            picture.addEventListener("click", () => {
                this.currentImageIndex = index; // Mettre à jour l'index courant
                this.openModal(picture);
            });
        });

        // Configuration des flèches de navigation
        if (this.rightArrow) {
            this.rightArrow.addEventListener("click", () => this.nextPictureModal());
        }
        if (this.leftArrow) {
            this.leftArrow.addEventListener("click", () => this.previousPictureModal());
        }
        if (this.selectorCloseModal) {
            this.selectorCloseModal.addEventListener("click", () => this.closeModal());
        }
    }

    openModal(picture) {
        const imgUrl = picture.getAttribute("src");
        const imgAlt = picture.getAttribute("alt");

        if (!imgUrl) {
            console.error("L'URL de l'image est manquante ou incorrecte:", imgUrl);
            return;
        }

        const createModalPicture = document.createElement("img");
        createModalPicture.src = imgUrl;
        createModalPicture.alt = imgAlt || 'Image sans description';

        this.modalPicture.innerHTML = "";
        this.modalPicture.appendChild(createModalPicture);

        this.modalElement.style.display = "flex";
        this.modalElement.classList.add('show');
        document.body.style.overflow = "hidden";
    }

    nextPictureModal() {
        let nextIndex = (this.currentImageIndex + 1) % this.allPicture.length;
        this.openModal(this.allPicture[nextIndex]);
        this.currentImageIndex = nextIndex;
    }

    previousPictureModal() {
        let previousIndex = (this.currentImageIndex - 1 + this.allPicture.length) % this.allPicture.length;
        this.openModal(this.allPicture[previousIndex]);
        this.currentImageIndex = previousIndex;
    }

    closeModal() {
        this.modalElement.style.display = "none";
        this.modalElement.classList.remove('show');
        document.body.style.overflow = "auto";
    }
}