import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");

const listItemsMarkup = createGalleryElMarkup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", listItemsMarkup);

function createGalleryElMarkup(galleryItems) {
    return galleryItems.map(galleryItem => `<a class="gallery__item" href="${galleryItem.original}">
    <img class="gallery__image" src="${galleryItem.preview}" alt="${galleryItem.description}" />
</a>`).join('');
}

galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {    
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    event.preventDefault();
}

let gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});