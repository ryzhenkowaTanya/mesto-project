import {deleteCard, removeLike, setLike} from "./api";
import {responseError} from "./utils";
import {openPopup} from "./modal";

export const templateCards = document.querySelector('#card-template').content.querySelector('.card');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const cardList = document.querySelector('.cards__list');


function setTextContent(element, value) {
    element.textContent = value
}

export function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
}

//создание новой карточки
export function createCard(card, userId) {
    const isOwner = card.owner._id === userId
    const cardId = card._id;
    const templateElement = templateCards.cloneNode(true);
    templateElement.querySelector('.card__title').textContent = card.name;
    const templateCardImage = templateElement.querySelector('.card__image');
    const btnLike = templateElement.querySelector('.card__button-like')
    const cardDelete = templateElement.querySelector('.card__button-delete')

    const cardLikeCounter = templateElement.querySelector('.card__like-counter')
    setTextContent(cardLikeCounter, card.likes.length)
    templateCardImage.setAttribute('src', card.link);
    btnLike.addEventListener('click', (evt) => {
        handleLikeCard(evt, cardId, cardLikeCounter)
    });

    if (isOwner) {
        cardDelete.classList.add("card__button-delete_active")
        cardDelete.addEventListener('click', (evt) => {
            handleDeleteCard(evt, cardId);
        })
    }
    templateCardImage.alt = card.name;
    templateCardImage.addEventListener('click', () => {
        handlePreviewImages(card)
    });

    return templateElement
}

//реализация лайка
function handleLikeCard(evt, cardId, cardLikeCounter) {
    if (evt.target.classList.contains('like-active')) {
        removeLike(cardId)
            .then(card => {
                    setTextContent(cardLikeCounter, card.likes.length);
                    evt.target.classList.toggle('like-active');
                }
            ).catch(err => responseError(err, 'removeLike'))
    } else {
        setLike(cardId)
            .then(card => {
                    setTextContent(cardLikeCounter, card.likes.length);
                    evt.target.classList.toggle('like-active');
                }
            ).catch(err => responseError(err, 'setLike'))
    }
}

// удаление карточки
function handleDeleteCard(evt, cardId) {
    deleteCard(cardId).then(() => {
        evt.target.closest('.card').remove()
    }).catch(err => responseError(err, 'deleteCard'))
}

//добавление карточки
export function addCartInList(card, userId) {
    cardList.prepend(createCard(card, userId))
}
