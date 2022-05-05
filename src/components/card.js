import {buttonOpenPopupProfile, closePopup, editPopup} from "./modal";
import {handlePreviewImages} from "./modal";
import {handlerProfileSubmit} from "./modal";
import {popupCreateCard} from "./modal";

export const formElement = document.querySelector('.popup__form');
export const cardForm = document.querySelector('.popup__form_type_card');
export const templateCards = document.querySelector('#card-template').content.querySelector('.card');
export const nameInputCard = document.querySelector('.popup__input_type_name-card');
export const linkInputCard = document.querySelector('.popup__input_type_link');
const cardList = document.querySelector('.cards__list');


export const initialCards = [
    {
        name: 'Pulau Ubin',
        link: 'https://images.unsplash.com/photo-1617015606776-c54fd56b69b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        alt: ''
    },
    {
        name: 'Portovenere',
        link: 'https://images.unsplash.com/photo-1617102888614-ae5c7c90d7eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        alt: ''
    },
    {
        name: 'Takayama',
        link: 'https://images.unsplash.com/photo-1616666720355-03ce7f70b237?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        alt: ''
    },
    {
        name: 'Ortygia',
        link: 'https://images.unsplash.com/photo-1612361814394-35785ba16dc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=702&q=80',
        alt: ''
    },
    {
        name: 'Novara di Sicilia',
        link: 'https://images.unsplash.com/photo-1612361808300-da9583e1b34e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=671&q=80',
        alt: ''
    },
    {
        name: 'Gíza',
        link: 'https://images.unsplash.com/photo-1590133324192-1df305deea6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1252&q=80',
        alt: ''
    }];

export function handlerCardSubmit(evt) {
    evt.preventDefault();
    const card = {
        name: nameInputCard.value,
        link: linkInputCard.value
    }
    addCartInList(card)
    cardForm.reset();
    closePopup(popupCreateCard);
}

//создание новой карточки
export function createCard(card) {
    const templateElement = templateCards.cloneNode(true);
    templateElement.querySelector('.card__title').textContent = card.name;
    const templateCardImage = templateElement.querySelector('.card__image');
    const btnLike = templateElement.querySelector('.card__button-like')
    const cardDelete = templateElement.querySelector('.card__button-delete')
    templateCardImage.setAttribute('src', card.link);
    btnLike.addEventListener('click', handleLikeCard);
    cardDelete.addEventListener('click', handleDeleteCard);
    templateCardImage.alt = card.name;
    templateCardImage.addEventListener('click', () => {
        handlePreviewImages(card)
    });

    return templateElement
}

//реализация лайка
function handleLikeCard(evt) {
    evt.target.classList.toggle('like-active')
}

// удаление карточки
function handleDeleteCard(evt) {
    evt.target.closest('.card').remove()
}

//добавление карточки
export function addCartInList(card) {
    const templateElement = createCard(card);
    cardList.prepend(templateElement)
}

initialCards.forEach(addCartInList);

//submit
formElement.addEventListener('submit', handlerProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', editPopup);
cardForm.addEventListener('submit', handlerCardSubmit);
