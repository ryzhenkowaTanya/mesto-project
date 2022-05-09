import {buttonOpenPopupProfile, closePopup, editPopup, popupUpdateAvatar, setProfile} from "./modal";
import {handlePreviewImages} from "./modal";
import {handlerProfileSubmit} from "./modal";
import {popupCreateCard} from "./modal";
import {addCard, deleteCard, getUserInfo, removeLike, setLike, updateUserAvatar} from "./api";
import {responseError} from "./utils";

export const userInfoForm = document.querySelector('.popup__form_type_edit-info');
export const cardForm = document.querySelector('.popup__form_type_card');
export const avatarForm = document.querySelector('.popup__form_type_update-avatar');

export const templateCards = document.querySelector('#card-template').content.querySelector('.card');
export const nameInputCard = document.querySelector('.popup__input_type_name-card');
export const linkInputCard = document.querySelector('.popup__input_type_link');
export const linkNameAvatar = document.querySelector('.popup__input_name_avatar-link');
export const loading = document.getElementById('loading')

const cardList = document.querySelector('.cards__list');


let userId = null

getUserInfo()
    .then((userInfo) => {
        userId = userInfo._id
    }).catch(err => responseError(err, 'getUserInfo'));

function setTextContent(element, value) {
    element.textContent = value
}

export function handlerCardSubmit(evt) {
    evt.preventDefault();
    addCard(nameInputCard.value, linkInputCard.value)
        .then((card) => {
                addCartInList(card, userId);
                cardForm.reset();
                closePopup(popupCreateCard);
            }
        ).catch(err => responseError(err, 'addCard'))
}

export function handlerUpdateAvatarSubmit(evt) {
    loading.textContent = "Сохранение..."
    evt.preventDefault();
    updateUserAvatar(linkNameAvatar.value)
        .then((res) => {
                setProfile(res.name, res.about, res.avatar);
                avatarForm.reset();
                closePopup(popupUpdateAvatar);

            }
        ).catch(err => responseError(err, 'updateUserAvatar'))
        .finally(() => {
            loading.textContent = "Сохранить";
        })
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
    })
        .catch(err => responseError(err, 'deleteCard'))
}

//добавление карточки
export function addCartInList(card, userId) {
    cardList.prepend(createCard(card, userId))
}

//submit
userInfoForm.addEventListener('submit', handlerProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', editPopup);

cardForm.addEventListener('submit', handlerCardSubmit);
avatarForm.addEventListener('submit', handlerUpdateAvatarSubmit);


//счетчик лайков
