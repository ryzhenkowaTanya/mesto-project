import './styles/index.css';

const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
const buttonClosePopupProfile = document.querySelector('.popup__close');
const buttonClosePopupCard = document.querySelector('.popup__close_type_cards');
const popupEditProfile = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardForm = document.querySelector('.popup__form_type_card');
const popupImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = document.querySelector('.popup__close_type_image');
const nameInputCard = document.querySelector('.popup__input_type_name-card');
const linkInputCard = document.querySelector('.popup__input_type_link');
const popupCreateCard = document.querySelector('.popup_type_new-card');
const buttonCreateCard = document.querySelector('.profile__button-add');
const cardList = document.querySelector('.cards__list');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const templateCards = document.querySelector('#card-template').content.querySelector('.card');


function handlerCardSubmit(evt) {
    evt.preventDefault();
    const card = {
        name: nameInputCard.value,
        link: linkInputCard.value
    }
    addCartInList(card)
    cardForm.reset();
    closePopup(popupCreateCard);
}

function editPopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

function openPopup(open) {
    open.classList.add('popup-opened');
    document.addEventListener('keydown', closePopupPressEsc)
}

function closePopup(close) {
    close.classList.remove('popup-opened');
    document.removeEventListener('keydown', closePopupPressEsc)
}

function handlerProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closePopup(popupEditProfile);
}

//создание новой карточки
function createCard(card) {
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

function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
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
function addCartInList(card) {
    const templateElement = createCard(card);
    cardList.prepend(templateElement)
}

//close Popup on button
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCreateCard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage));

//function close popup press on esc
function closePopupPressEsc(event) {
    if (event.keyCode === 27) {
        closePopup(document.querySelector('.popup-opened'))
    }
}

//function close press on empty space
function closePressEmpty(close, popup) {
    if (close.target.matches('.popup-opened')) {//event.target.matches('.popup-opened')
        closePopup(popup)
    }
}

document.addEventListener('click', close => closePressEmpty(close, popupEditProfile));
document.addEventListener('click', close => closePressEmpty(close, popupCreateCard));
document.addEventListener('click', close => closePressEmpty(close, popupImage));

//openPopup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));
//submit
cardForm.addEventListener('submit', handlerCardSubmit);
formElement.addEventListener('submit', handlerProfileSubmit);
buttonOpenPopupProfile.addEventListener('click', editPopup);

initialCards.forEach(addCartInList);