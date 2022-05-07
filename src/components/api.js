// export default class Api {
//
//     _getResponseData(res) {
//         if (res.ok) {
//             return res.json();
//         }
//
//         return Promise.reject(new Error(`Ошибка: ${res.status}`));
//     }
//
//     getInitialCards(config) {
//         return fetch(`${config.baseUrl}/cards`, {
//             headers: config.headers
//         })
//             .then(res => {
//                 return this._getResponseData(res);
//             })
//     }
//
//     // getProfileInfo() {
//     //     return fetch(`${this.baseUrl}/users/me`, {
//     //         headers: this.headers
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
//     //
//     // updateUserPhoto(userPhotoLink) {
//     //     return fetch(`${this.baseUrl}/users/me/avatar`, {
//     //         method: 'PATCH',
//     //         headers: this.headers,
//     //         body: JSON.stringify({avatar: userPhotoLink})
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
//     //
//     // updateUserProfileInfo(userInfo) {
//     //     return fetch(`${this.baseUrl}/users/me`, {
//     //         method: 'PATCH',
//     //         headers: this.headers,
//     //         body: JSON.stringify({
//     //             name: userInfo.name,
//     //             about: userInfo.about
//     //         })
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
//     //
//     // addNewCard(cardData) {
//     //     return fetch(`${this.baseUrl}/cards`, {
//     //         method: 'POST',
//     //         headers: this.headers,
//     //         body: JSON.stringify({
//     //             name: cardData.name,
//     //             link: cardData.link
//     //         })
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
//     //
//
//     //
//     // deleteCard(cardID) {
//     //     return fetch(`${this.baseUrl}/cards/${cardID}`, {
//     //         method: 'DELETE',
//     //         headers: this.headers
//     //     }).then(res => {
//     //         return this._getResponseData(res);
//     //     })
//     // }
//     //
//     // likeCard(cardId) {
//     //     return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
//     //         method: 'PUT',
//     //         headers: this.headers
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
//     //
//     // unLikeCard(cardId) {
//     //     return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
//     //         method: 'DELETE',
//     //         headers: this.headers
//     //     })
//     //         .then(res => {
//     //             return this._getResponseData(res);
//     //         })
//     // }
// }
