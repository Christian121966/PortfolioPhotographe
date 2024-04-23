let currentIndex = 0
const items = document.querySelectorAll('.carousel-item')
const totalItems = items.length
const indicators = document.querySelectorAll('.carousel-indicators button')

function changeItem(index) {
  const toggleActiveClass = (elements, index) => {
    elements.forEach((el) => el.classList.remove('active'))
    elements[index].classList.add('active')
  }

  toggleActiveClass(items, index)
  toggleActiveClass(indicators, index)

  currentIndex = index
}

function initCarouselControls() {
  document
    .querySelector('.carousel-control-next')
    .addEventListener('click', () => {
      changeItem((currentIndex + 1) % totalItems)
    })

  document
    .querySelector('.carousel-control-prev')
    .addEventListener('click', () => {
      changeItem((currentIndex - 1 + totalItems) % totalItems)
    })

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => changeItem(index))
  })
}

function initGalleryFilters() {
  const buttons = document.querySelectorAll('.gallery-button')
  const pictures = document.querySelectorAll('.picture-item')

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter')

      buttons.forEach((btn) => btn.classList.remove('selected-filter'))
      this.classList.add('selected-filter')

      pictures.forEach((picture) => {
        picture.style.display =
          filter === 'tous' ||
          picture.querySelector('img').dataset.galleryTag.includes(filter)
            ? 'block'
            : 'none'
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initCarouselControls()
  initGalleryFilters()

  setInterval(() => {
    changeItem((currentIndex + 1) % totalItems)
  }, 5000)
})
