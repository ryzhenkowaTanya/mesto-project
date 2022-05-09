const popups = document.querySelectorAll('.popup')

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
