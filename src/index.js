//Подключение файла со стилями
import './styles/index.css';
import './components/card'

//импорт из файла card.js
import {addCartInList} from "./components/card";
//импорт из файла validate.js
import {enableValidation, validationConfig} from "./components/validate";
//импорт из файла api.js
import {addCard, getCards, getUserInfo, updateUserAvatar, updateUserProfile} from "./components/api";
//импорт из файла utils.js
import {responseError} from "./components/utils";
//импорт из файла madal.js
import {closePopup, openPopup} from "./components/modal";

let userId = null

Promise
    .all([getCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        userId = userInfo._id
        setProfile(userInfo.name, userInfo.about, userInfo.avatar)
        cards.reverse().forEach(card => addCartInList(card, userInfo._id, handlePreviewImages))
    }).catch(err => responseError(err, 'getCards && getUserInfo'));

const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const buttonCreateCard = document.querySelector('.profile__button-add');
const buttonUpdateAvatar = document.querySelector(".profile__avatar-button")
export const popupCreateCard = document.querySelector('.popup_type_new-card');
export const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar')
export const nameInputCard = document.querySelector('.popup__input_type_name-card');
export const linkInputCard = document.querySelector('.popup__input_type_link');
export const linkNameAvatar = document.querySelector('.popup__input_name_avatar-link');
export const loading = document.getElementById('loading')
export const saveUserProfile = document.getElementById('save-user-profile')
export const createCard = document.getElementById('create')
export const userInfoForm = document.querySelector('.popup__form_type_edit-info');
export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
export const cardForm = document.querySelector('.popup__form_type_card');
export const avatarForm = document.querySelector('.popup__form_type_update-avatar');

export function handlerCardSubmit(evt) {
    createCard.textContent = "Cоздание..."
    evt.preventDefault();
    addCard(nameInputCard.value, linkInputCard.value)
        .then((card) => {
                addCartInList(card, userId, handlePreviewImages);
                cardForm.reset();
                closePopup(popupCreateCard);
            }
        ).catch(err => responseError(err, 'addCard'))
        .finally(() => {
            createCard.textContent = "Cоздать";
        })
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

export function handlerProfileSubmit(evt) {
    saveUserProfile.textContent = "Сохранение..."
    evt.preventDefault();
    updateUserProfile(inputName.value, inputJob.value)
        .then(res => {
            setUserInfo(res.name, res.about);
            closePopup(popupEditProfile);
        })
        .catch(err => responseError(err, 'updateUserProfile'))
        .finally(() => {
            saveUserProfile.textContent = "Сохранить";
        })
}

export function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
}

//Listener for open popup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));
buttonUpdateAvatar.addEventListener('click', () => openPopup(popupUpdateAvatar));

//submit
userInfoForm.addEventListener('submit', handlerProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', editPopup);
cardForm.addEventListener('submit', handlerCardSubmit);
avatarForm.addEventListener('submit', handlerUpdateAvatarSubmit);


enableValidation(Object.assign({
    formSelector: '.popup__form[name="editInfo"]'
}, validationConfig))

enableValidation(Object.assign({
    formSelector: '.popup__form[name="insertInfo"]'
}, validationConfig))

enableValidation(Object.assign({
    formSelector: '.popup__form[name="updateAvatar"]',
}, validationConfig))

