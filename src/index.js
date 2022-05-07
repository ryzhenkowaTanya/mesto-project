//Подключение файла со стилями
import './styles/index.css';
//import { Api } from '../components/Api.js';

//импорт из файла card.js
import './components/card'
import {formElement} from "./components/card";

//modal
import {handlerProfileSubmit} from "./components/modal";
import {editPopup} from "./components/modal";
import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
import {enableValidation} from "./components/validate";

let userId = 0;

const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort7/cards',
    headers: {
        authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
        'content-type': 'application/json'
    }
};

const userInfo = new UserInfo({
    profileNameSelector: document.querySelector('.profile__name'),
    profileActivitiesSelector: document.querySelector('.profile__job'),
    profileImageSelector: document.querySelector('.profile__avatar'),
});

const cardsList = new Section({
    data: {},
    renderer: (item) => {
        let card;
        if (item.owner._id === userInfo.getUserInfo().id) {
            card = createNewCard(item, '#own-element-template', true);
        } else {
            card = createNewCard(item, '#element-template', false);
        }
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, true);
    }
}, cardsBlock);

Promise.all([
    api.getProfileInfo(),
    api.getInitialCards()
])
    .then(values => {
        const [userData, initialCards] = values;
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setUserImage(userData.avatar);
        userInfo.setUserID(userData._id);
        cardsList.setData(initialCards);
        cardsList.renderItems();
    })
    .catch((error) => sendError(error));

const confirmPopupElement = new PopupForConfirm(confirmPopupSelector, (cardId) => {
    api.deleteCard(cardId).then((data) => {
        document.getElementById(cardId).closest('.element').remove();
        confirmPopupElement.close();
    });
}, confirmPopupSelector);
confirmPopupElement.setEventListeners();
confirmPopupElement.setupConfirmation();

const createNewCard = function (data, cardSectionSelector, isOwn) {
    data.isLiked = defineLikedCard(data);
    let card;
    if (isOwn) {
        card = new OwnCard(data, cardSectionSelector, (cardName, cardImage) => {
            imagePopupElement.open({
                name: cardName,
                link: cardImage
            });
        }, (evt, cardId) => {
            confirmPopupElement.open(cardId);
        }, (cardId, isLiked, evt) => {
            likeCardCallBack(isLiked, cardId, card, evt);
        });
    } else {
        card = new Card(data, cardSectionSelector, (cardName, cardImage) => {
            imagePopupElement.open({
                name: cardName,
                link: cardImage
            });
        }, (cardId, isLiked, evt) => {
            likeCardCallBack(isLiked, cardId, card, evt);
        });
    }
    return card;
}

const defineLikedCard = function(data) {
    let result = false;
    data.likes.forEach((item) => {
        if(item._id === userInfo._id) {
            result = true;
        }
    });
    return result;
}

const likeCardCallBack = function (isLiked, cardId, card, evt) {
    if (!isLiked) {
        api.likeCard(cardId)
            .then(data => {
                card._likes = data.likes.length;
                evt.target.closest('.element').querySelector('.element__likes').textContent = card._likes;
                evt.target.classList.toggle('element__like-button_status_active');
                card._isLiked = true;
            })
            .catch((error) => sendError(error));
    } else {
        api.unLikeCard(cardId)
            .then(data => {
                card._likes = data.likes.length;
                evt.target.closest('.element').querySelector('.element__likes').textContent = card._likes;
                evt.target.classList.toggle('element__like-button_status_active');
                card._isLiked = false;
            })
            .catch((error) => sendError(error));
    }
}

const changePhotoElement = new PopupWithForm((values) => {
    renderLoading(changePhotoElement, true);
    api.updateUserPhoto(values.link)
        .then((data) => {
            userInfo.setUserImage(values.link);
            changePhotoElement.close();
            renderLoading(changePhotoElement, false);
        })
        .catch((error) => sendError(error));
}, changePhotoPopup);
changePhotoElement.setEventListeners();

const editPopupElement = new PopupWithForm((values) => {
    renderLoading(editPopupElement, true);
    api.updateUserProfileInfo({name: values.name, about: values.activities})
        .then(data => {
            userInfo.setUserInfo(data.name, data.about);
            editPopupElement.close();
            renderLoading(editPopupElement, false);
        })
        .catch((error) => sendError(error));
}, editPopup);
editPopupElement.setEventListeners();

const addPopupElement = new PopupWithForm((values) => {
    renderLoading(addPopupElement, true);
    api.addNewCard({
        name: values.title,
        link: values.url,
        likes: []
    })
        .then(data => {
            const card = createNewCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                _id: data._id
            }, '#own-element-template', true);
            cardsList.addItem(card.generateCard(), false);
            addPopupElement.close();
            renderLoading(addPopupElement, false);
        })
        .catch((error) => sendError(error));
}, addPopup);
addPopupElement.setEventListeners();

const imagePopupElement = new PopupWithImage('.popup_for_photo');
imagePopupElement.setEventListeners();

const startSetupFormsValidation = function () {
    document.querySelectorAll('.popup__form').forEach(function (form) {
        const formValidator = new FormValidator(params, form);
        formValidator.enableValidation();
    });
};

startSetupFormsValidation();

const addActionsOnProfileButtons = function () {
    editButton.addEventListener('click', () => {
        const info = userInfo.getUserInfo();
        editForm.elements.name.value = info.name;
        editForm.elements.activities.value = info.activities;
        editPopupElement.open();
    });

    editPhotoButton.addEventListener('click', () => {
        changePhotoElement.open();
    })

    addButton.addEventListener('click', () => {
        addPopupElement.open();
    });
};

addActionsOnProfileButtons();