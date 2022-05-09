import {openPopup} from "./modal";

import {
    createCard,
    handlerCardSubmit,
    handlerProfileSubmit,
    handlerUpdateAvatarSubmit,
    inputJob,
    inputName, popupEditProfile
} from "../index";


export const userInfoForm = document.querySelector('.popup__form_type_edit-info');
export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
export const cardForm = document.querySelector('.popup__form_type_card');
export const avatarForm = document.querySelector('.popup__form_type_update-avatar');

export const templateCards = document.querySelector('#card-template').content.querySelector('.card');
export const nameInputCard = document.querySelector('.popup__input_type_name-card');
export const linkInputCard = document.querySelector('.popup__input_type_link');
export const linkNameAvatar = document.querySelector('.popup__input_name_avatar-link');
export const loading = document.getElementById('loading')

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');
const cardList = document.querySelector('.cards__list');

export function setProfile(name, about, avatar) {
    setUserInfo(name, about)
    setUserAvatar(avatar)
}

export function setUserInfo(name, about) {
    profileName.textContent = name;
    profileJob.textContent = about;
}

export function setUserAvatar(avatar) {
    profileAvatar.src = avatar
}


export function editPopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupEditProfile);

}

export function setTextContent(element, value) {
    element.textContent = value
}

export function removeCard(evt) {
    evt.target.closest('.card').remove()
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
