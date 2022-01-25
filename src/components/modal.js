import {formElement} from "./card";

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupProfile = document.querySelector('.popup__close');
const buttonClosePopupCard = document.querySelector('.popup__close_type_cards');
const buttonClosePopupImage = document.querySelector('.popup__close_type_image');
const buttonCreateCard = document.querySelector('.profile__button-add');


export const popupCreateCard = document.querySelector('.popup_type_new-card');


export function editPopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupEditProfile);
}


export function handlerProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupEditProfile);
}


export function openPopup(open) {
    open.classList.add('popup-opened');
    document.addEventListener('keydown', closePopupPressEsc)
}

export function closePopup(close) {
    close.classList.remove('popup-opened');
    document.removeEventListener('keydown', closePopupPressEsc)
}

export function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
}


//function close popup press on esc
export function closePopupPressEsc(event) {
    if (event.keyCode === 27) {
        closePopup(document.querySelector('.popup-opened'))
    }
}

document.addEventListener('click', close => closePressEmpty(close, popupEditProfile));
document.addEventListener('click', close => closePressEmpty(close, popupCreateCard));
document.addEventListener('click', close => closePressEmpty(close, popupImage));

//function close press on empty space
function closePressEmpty(close, popup) {
    if (close.target.matches('.popup-opened')) {//event.target.matches('.popup-opened')
        closePopup(popup)
    }
}


//close Popup on button
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCreateCard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));


//openPopup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));


export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
