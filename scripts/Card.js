const initialCards = [
    {
        name: 'Pulau Ubin',
        link: 'https://images.unsplash.com/photo-1617015606776-c54fd56b69b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        alt: ''
    },
    {
        name: 'Portovenere',
        link: 'https://images.unsplash.com/photo-1617102888614-ae5c7c90d7eb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        alt: ''
    },
    {
        name: 'Takayama',
        link: 'https://images.unsplash.com/photo-1616666720355-03ce7f70b237?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        alt: ''
    },
    {
        name: 'Ortygia',
        link: 'https://images.unsplash.com/photo-1612361814394-35785ba16dc3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=702&q=80',
        alt: ''
    },
    {
        name: 'Novara di Sicilia',
        link: 'https://images.unsplash.com/photo-1612361808300-da9583e1b34e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=671&q=80',
        alt: ''
    },
    {
        name: 'Gíza',
        link: 'https://images.unsplash.com/photo-1590133324192-1df305deea6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1252&q=80',
        alt: ''
    }];

// //popup image
// const buttonClosePopupImage = document.querySelector('.popup__close_type_image');
// const popupOpenImage = document.querySelector('.popup__image');
// const popupImage = document.querySelector('.popup_type_image');
// //popup card
// const buttonOpenPopupEdit = document.querySelector('.profile__button-add');
// const buttonClosePopupCard = document.querySelector('.popup__close_type_cards');
// const popupCreateCard = document.querySelector('.popup_type_new-card');
//
// const deleteCard = document.querySelector('.card__button-delete')
// //popup edit profile
// const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
// const buttonClosePopupProfile = document.querySelector('.popup__close');
// const popupEditProfile = document.querySelector('.popup_type_edit');
// //like
// const buttonLike = document.querySelector('.card__button-like')
//
// const createCard = document.querySelector('.popup__button_create-card')
//
// //input
//
// const nameInputCard = document.querySelector('.popup__input_type_name-card');
// const linkInputCard = document.querySelector('.popup__input_type_link');
//
//
// class Card {
//     constructor(name, link, alt, templateElement) {
//         this._name = name
//         this._link = link
//         this._alt = alt
//         this._templateElement = templateElement
//     }
//
//     _getTemplate() {
//         return  this._templateElement;
//     }
//
//     generateCard() {
//         this._element = this._getTemplate();
//         this._setEventListeners();
//         // Добавим данные
//         this._element.querySelector('.card__image').src = this._link
//         this._element.querySelector('.card__title').textContent = this._name;
//         this._element.querySelector('.card__title').alt = this._alt;
//
//         return this._element;
//     }
//
//     _setEventListeners() {
//         //open and close popup image
//         this._element.querySelector('.card__image').addEventListener('click', () => {
//             popupOpenImage.src = this._link;
//             this._handleOpenPopup(popupImage)
//         })
//         buttonClosePopupImage.addEventListener('click', () => {
//             this._handleClosePopup(popupImage)
//         });
//         //open and close popup create card
//         buttonOpenPopupEdit.addEventListener('click', () => {
//             this._handleOpenPopup(popupCreateCard)
//         })
//         buttonClosePopupCard.addEventListener('click', () => {
//             this._handleClosePopup(popupCreateCard)
//         })
//         //open and close popup edit profile
//         buttonOpenPopupProfile.addEventListener('click', () => {
//             this._handleOpenPopup(popupEditProfile)
//         })
//         buttonClosePopupProfile.addEventListener('click', () => {
//             this._handleClosePopup(popupEditProfile)
//         })
//
//         //like
//         this._element.querySelector('.card__button-like').addEventListener('click', this._toggleLikeCard)
//         //delete
//         this._element.querySelector('.card__button-delete').addEventListener('click', this._deleteCard)
//
//     }
//
//     _handleOpenPopup(open) {
//         open.classList.add('popup-opened');
//     }
//
//     _handleClosePopup(close) {
//         close.classList.remove('popup-opened');
//     }
//
//     //like
//     _toggleLikeCard(event) {
//         event.target.classList.toggle('like-active')
//     }
//
//     //delete
//     _deleteCard() {
//         document.querySelector('.card').remove();
//     }
//
// }
// const cardList = document.querySelector('.cards__list');
//
// initialCards.forEach(addNewCard);
//
// function addNewCard(item) {
//     const templateElement = document.querySelector('.card-template')
//         .content
//         .querySelector('.card')
//         .cloneNode(true);
//
//     const card = new Card(item.name, item.link, item.alt, templateElement);
//     const cardElement = card.generateCard()
//     cardList.append(cardElement);
// }
//
//
//     const cardForm = document.querySelector('.popup__form_type_card');
//
// cardForm.addEventListener('submit', handlerCardSubmit);
//
// function handlerCardSubmit(item) {
//     item.preventDefault();
//     addNewCard(item)
//     cardForm.reset();
//     // closePopup(popupCreateCard); // todo
// }




// //создание новой карточки
// function createCard(card) {
//     const templateElement = templateCards.cloneNode(true);
//     templateElement.querySelector('.card__title').textContent = card.name;
//     const templateCardImage = templateElement.querySelector('.card__image');
//     const btnLike = templateElement.querySelector('.card__button-like')
//     const cardDelete = templateElement.querySelector('.card__button-delete')
//     templateCardImage.setAttribute('src', card.link);
//     btnLike.addEventListener('click', handleLikeCard);
//     cardDelete.addEventListener('click', handleDeleteCard);
//     templateCardImage.alt = card.name;
//     templateCardImage.addEventListener('click', () => {
//         handlePreviewImages(card)
//     });
//
//     return templateElement
//
// }
