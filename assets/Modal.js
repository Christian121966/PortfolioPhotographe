export class Modal {
    constructor(selector) {
        this.modalElement = document.querySelector(selector);
        this.modalContent = this.modalElement.querySelector(".modal-content");
        this.modalPicture = this.modalElement.querySelector(".modal-picture");
        this.allPicture = document.querySelectorAll(".gallery-picture");
        this.selectorCloseModal = this.modalElement.querySelector(".close"); // Assurez-vous que c'est la classe correcte pour le bouton de fermeture.
        this.rightArrow = this.modalElement.querySelector(".modal-arrow-right");
        this.leftArrow = this.modalElement.querySelector(".modal-arrow-left");
        this.currentImageIndex = 0;
        this.setupModal();
    }

    setupModal() {
        this.allPicture.forEach((picture) => {
            picture.addEventListener("click", () => this.openModal(picture));
        });

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
        let dataIndex = parseInt(picture.getAttribute("data-index"));
        const imgUrl = picture.getAttribute("src");
        const imgAlt = picture.getAttribute("alt");

        const createModalPicture = document.createElement("img");
        createModalPicture.src = imgUrl;
        createModalPicture.alt = imgAlt;

        this.modalPicture.innerHTML = "";
        this.modalPicture.appendChild(createModalPicture);

        this.modalElement.style.display = "flex";
        this.modalContent.style.display = "block";
        document.body.style.overflow = "hidden";

        this.currentImageIndex = dataIndex;
    }

    nextPictureModal() {
        let nextIndex = (this.currentImageIndex + 1) % this.allPicture.length;
        this.openModal(this.allPicture[nextIndex]);
    }

    previousPictureModal() {
        let previousIndex = (this.currentImageIndex - 1 + this.allPicture.length) % this.allPicture.length;
        this.openModal(this.allPicture[previousIndex]);
    }

    closeModal() {
        this.modalElement.style.display = "none";
        this.modalContent.style.display = "none";
        document.body.style.overflow = "auto";
        this.currentImageIndex = 0;
    }
}