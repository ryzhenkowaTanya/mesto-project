

console.log('erew')


export function editPopup() {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

function openPopup(open) {
    open.classList.add('popup-opened');
    document.addEventListener('keydown', closePopupPressEsc)
}

export function closePopup(close) {
    close.classList.remove('popup-opened');
    document.removeEventListener('keydown', closePopupPressEsc)
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

