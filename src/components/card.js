import {editPopup, handlerCardSubmit, handlerUpdateAvatarSubmit} from "../index";
import {handlerProfileSubmit} from "../index";

import {deleteCard, removeLike, setLike} from "./api";
import {responseError} from "./utils";

export const userInfoForm = document.querySelector('.popup__form_type_edit-info');
export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
export const cardForm = document.querySelector('.popup__form_type_card');
export const avatarForm = document.querySelector('.popup__form_type_update-avatar');
export const templateCards = document.querySelector('#card-template').content.querySelector('.card');
const cardList = document.querySelector('.cards__list');

function setTextContent(element, value) {
    element.textContent = value
}

//создание новой карточки
export function createCard(card, userId, handlePreviewImages) {
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
    if (card.likes.some(user => user._id === userId)) {
        btnLike.classList.add('like-active');
    }
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
            .then(card => setOrRemoveLikes(evt, cardLikeCounter, card.likes.length)
            ).catch(err => responseError(err, 'removeLike'))
    } else {
        setLike(cardId)
            .then(card => setOrRemoveLikes(evt, cardLikeCounter, card.likes.length)
            ).catch(err => responseError(err, 'setLike'))
    }
}

function setOrRemoveLikes(evt, cardLikeCounter, countLikes) {
    setTextContent(cardLikeCounter, countLikes);
    evt.target.classList.toggle('like-active');
}

// удаление карточки
function handleDeleteCard(evt, cardId) {
    deleteCard(cardId).then(() => {
        removeCard(evt)
    })
        .catch(err => responseError(err, 'deleteCard'))
}

function removeCard(evt) {
    evt.target.closest('.card').remove()
}

//добавление карточки
export function addCartInList(card, userId, handlePreviewImages) {
    cardList.prepend(createCard(card, userId, handlePreviewImages))
}

//submit
userInfoForm.addEventListener('submit', handlerProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', editPopup);
cardForm.addEventListener('submit', handlerCardSubmit);
avatarForm.addEventListener('submit', handlerUpdateAvatarSubmit);
