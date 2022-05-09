//Подключение файла со стилями
import './styles/index.css';

//импорт из файла card.js
import './components/card'
import {addCartInList, formElement, initialCards} from "./components/card";

//modal
import {handlerProfileSubmit, setProfile} from "./components/modal";
import {editPopup} from "./components/modal";
import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
import {enableValidation} from "./components/validate";
import {getCards, getUserInfo} from "./components/api";

export function responseError(err, msg) {
    console.error(msg, err);
}

getUserInfo()
    .then(res =>
        setProfile(res.name, res.about, res.avatar)
    ).catch(err => responseError(err, 'getUserInfo'));


Promise
    .all([getCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        cards.forEach(card => addCartInList(card,userInfo._id))
    } ).catch(err => responseError(err, 'getCards'));


