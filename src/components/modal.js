const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupOpenImage = document.querySelector('.popup__image');
const popupSignatureImage = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup_type_image');
const buttonCreateCard = document.querySelector('.profile__button-add');
const popups = document.querySelectorAll('.popup')

export const popupCreateCard = document.querySelector('.popup_type_new-card');
export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');

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

export function handlePreviewImages(card) {
    popupOpenImage.src = card.link;
    popupOpenImage.alt = card.name;
    popupSignatureImage.textContent = card.name;
    openPopup(popupImage);
}

//function close and open popup
export function openPopup(open) {
    open.classList.add('popup__opened');
    document.addEventListener('keydown', closePopupPressEsc)
}

export function closePopup(close) {
    close.classList.remove('popup__opened');
    document.removeEventListener('keydown', closePopupPressEsc)
}

//function close popup press on esc
export function closePopupPressEsc(event) {
    if (event.key === 'Escape') {
        closePopup(document.querySelector('.popup__opened'))
    }
}

//Listener for open popup
buttonCreateCard.addEventListener('click', () => openPopup(popupCreateCard));

//Listeners close popups on button and empty space
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})
