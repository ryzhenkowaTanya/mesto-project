//Подключение файла со стилями
import './styles/index.css';

//импорт из файла card.js
import './components/card'
import {addCartInList} from "./components/card";

//modal
// import {handlerProfileSubmit, setProfile} from "./components/modal";
// import {editPopup} from "./components/modal";
// import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
import {enableValidation} from "./components/validate";
import {getCards, getUserInfo, updateUserProfile} from "./components/api";
import {responseError} from "./components/utils";
import {closePopup, openPopup} from "./components/modal";


Promise
    .all([getCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        setProfile(userInfo.name, userInfo.about, userInfo.avatar)
        cards.reverse().forEach(card => addCartInList(card, userInfo._id))
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

//Listener for open popup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));
buttonUpdateAvatar.addEventListener('click', () => openPopup(popupUpdateAvatar));
