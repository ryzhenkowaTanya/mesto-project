//Подключение файла со стилями
import './styles/index.css';

//импорт из файла card.js
import './components/card'
import {addCartInList} from "./components/card";

//modal
import {handlerProfileSubmit, setProfile} from "./components/modal";
import {editPopup} from "./components/modal";
import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
import {enableValidation} from "./components/validate";
import {getCards, getUserInfo} from "./components/api";
import {responseError} from "./components/utils";


Promise
    .all([getCards(), getUserInfo()])
    .then(([cards, userInfo]) => {
        setProfile(userInfo.name, userInfo.about, userInfo.avatar)
        cards.reverse().forEach(card => addCartInList(card, userInfo._id))
    }).catch(err => responseError(err, 'getCards && getUserInfo'));


