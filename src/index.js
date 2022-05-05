//Подключение файла со стилями
import './styles/index.css';

//импорт из файла card.js
import './components/card'
import {formElement} from "./components/card";

//modal
import {handlerProfileSubmit, updateProfile} from "./components/modal";
import {editPopup} from "./components/modal";
import {buttonOpenPopupProfile} from "./components/modal";

//импорт из файла validate.js
import {enableValidation} from "./components/validate";
import {getUserInfo} from "./components/api";


getUserInfo()
    .then(res =>
        updateProfile(res.name,res.about,res.avatar)
).catch(err => responseError(err, 'getUserInfo'));


function responseError(err, msg) {
    console.error(msg, err);
}