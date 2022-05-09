//Подключение файла со стилями
import './styles/index.css';

//импорт из файла card.js
import './components/card'
import {
    addCartInList,
    avatarForm,
    cardForm,
    linkInputCard,
    linkNameAvatar,
    loading,
    nameInputCard, removeCard, setProfile, setTextContent, setUserInfo, templateCards
} from "./components/card";

//modal
// import {handlerProfileSubmit, setProfile} from "./components/modal";
// import {editPopup} from "./components/modal";
// import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
// import {enableValidation} from "./components/validate";
import {
    addCard, deleteCard,
    getCards,
    getUserInfo,
    removeLike,
    setLike,
    updateUserAvatar,
    updateUserProfile
} from "./components/api";
import {responseError} from "./components/utils";
import {closePopup, openPopup} from "./components/modal";


let userId = null

getUserInfo()
    .then((userInfo) => {
        userId = userInfo._id
    }).catch(err => responseError(err, 'getUserInfo'));


Promise
    .all([getCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        setProfile(userInfo.name, userInfo.about, userInfo.avatar)
        cards.reverse().forEach(card => addCartInList(card, userInfo._id))
    }).catch(err => responseError(err, 'getCards && getUserInfo'));

export const inputName = document.querySelector('.popup__input_type_name');
export const inputJob = document.querySelector('.popup__input_type_job');

export const popupEditProfile = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const buttonCreateCard = document.querySelector('.profile__button-add');

const buttonUpdateAvatar = document.querySelector(".profile__avatar-button")

export const popupCreateCard = document.querySelector('.popup_type_new-card');
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar')

export function handlerProfileSubmit(evt) {
    evt.preventDefault();
    updateUserProfile(inputName.value, inputJob.value)
        .then(res => {
            setUserInfo(res.name, res.about);
            closePopup(popupEditProfile);
        })
        .catch(err => responseError(err, 'updateUserProfile'))
}

export function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
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
        removeCard(evt)
    })
        .catch(err => responseError(err, 'deleteCard'))
}

//Listener for open popup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));
buttonUpdateAvatar.addEventListener('click', () => openPopup(popupUpdateAvatar));
