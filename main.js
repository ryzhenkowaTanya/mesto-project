(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{EG:()=>z,b3:()=>V,ZH:()=>D,zH:()=>M,m7:()=>H});var t={baseUrl:"https://nomoreparties.co/v1/plus-cohort7/",headers:{authorization:"ea769cc4-10ce-4fe4-88ef-99f1e88db45d","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject({status:e.status,statusText:e.statusText})},r=function(){return fetch("".concat(t.baseUrl,"users/me"),{headers:t.headers}).then(n)};function o(e,t){console.error(t,e)}var a=document.querySelector(".popup__form_type_edit-info"),c=document.querySelector(".profile__button-edit"),u=document.querySelector(".popup__form_type_card"),i=document.querySelector(".popup__form_type_update-avatar"),s=document.querySelector("#card-template").content.querySelector(".card"),l=document.querySelector(".cards__list");function d(e,t){e.textContent=t}function p(e,r){l.prepend(function(e,r){var a=e.owner._id===r,c=e._id,u=s.cloneNode(!0);u.querySelector(".card__title").textContent=e.name;var i=u.querySelector(".card__image"),l=u.querySelector(".card__button-like"),p=u.querySelector(".card__button-delete"),f=u.querySelector(".card__like-counter");return d(f,e.likes.length),i.setAttribute("src",e.link),e.likes.some((function(e){return e._id===r}))&&l.classList.add("like-active"),l.addEventListener("click",(function(e){!function(e,r,a){e.target.classList.contains("like-active")?function(e){return fetch("".concat(t.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then(n)}(r).then((function(t){d(a,t.likes.length),e.target.classList.toggle("like-active")})).catch((function(e){return o(e,"removeLike")})):function(e){return fetch("".concat(t.baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(n)}(r).then((function(t){d(a,t.likes.length),e.target.classList.toggle("like-active")})).catch((function(e){return o(e,"setLike")}))}(e,c,f)})),a&&(p.classList.add("card__button-delete_active"),p.addEventListener("click",(function(e){!function(e,r){(function(e){return fetch("".concat(t.baseUrl,"cards/").concat(e),{method:"DELETE",headers:t.headers}).then(n)})(r).then((function(){!function(e){e.target.closest(".card").remove()}(e)})).catch((function(e){return o(e,"deleteCard")}))}(e,c)}))),i.alt=e.name,i.addEventListener("click",(function(){V(e)})),u}(e,r))}a.addEventListener("submit",M),c.addEventListener("click",z),u.addEventListener("submit",D),i.addEventListener("submit",H);var f={submitButtonSelector:".popup__button",validButtonClass:"popup_button_valid",invalidButtonClass:"popup_button_invalid",inputErrorClass:"popup__input_type_error"};function _(e){var t=document.querySelector(e.formSelector);t.addEventListener("submit",(function(t){return function(e,t){e.preventDefault();var n=e.currentTarget;n.checkValidity(),n.querySelector(t.submitButtonSelector).setAttribute("disabled","disabled"),n.reset()}(t,e)})),t.addEventListener("input",(function(t){return function(e,t){var n=e.target,r=e.currentTarget;(function(e,t,n){document.querySelector("#".concat(n.id,"-error")).textContent=n.validationMessage,n.validity.valid?n.classList.remove(t.inputErrorClass):n.classList.add(t.inputErrorClass)})(0,t,n),function(e,t){var n=e.querySelector(t.submitButtonSelector);e.checkValidity()?(n.classList.add(t.validButtonClass),n.classList.remove(t.invalidButtonClass),n.removeAttribute("disabled")):(n.classList.remove(t.validButtonClass),n.classList.add(t.invalidButtonClass),n.setAttribute("disabled","disabled"))}(r,t)}(t,e)}))}function m(e){e.classList.add("popup__opened"),document.addEventListener("keydown",y)}function v(e){e.classList.remove("popup__opened"),document.removeEventListener("keydown",y)}function y(e){"Escape"===e.key&&v(document.querySelector(".popup__opened"))}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}_(Object.assign({formSelector:'.popup__form[name="editInfo"]'},f)),_(Object.assign({formSelector:'.popup__form[name="insertInfo"]'},f)),_(Object.assign({formSelector:'.popup__form[name="updateAvatar"]'},f)),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup__opened")&&v(e),t.target.classList.contains("popup__close")&&v(e)}))})),Promise.all([fetch("".concat(t.baseUrl,"cards"),{headers:t.headers}).then(n),r()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,u=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(u)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];N(a.name,a.about,a.avatar),o.reverse().forEach((function(e){return p(e,a._id)}))})).catch((function(e){return o(e,"getCards && getUserInfo")}));var b=document.querySelector(".popup__input_type_name"),S=document.querySelector(".popup__input_type_job"),g=document.querySelector(".profile__name"),q=document.querySelector(".profile__job"),L=document.querySelector(".profile__avatar"),k=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),A=document.querySelector(".popup_type_image"),U=document.querySelector(".profile__button-add"),j=document.querySelector(".profile__avatar-button"),x=document.querySelector(".popup_type_new-card"),O=document.querySelector(".popup_type_update-avatar"),T=document.querySelector(".popup__input_type_name-card"),B=document.querySelector(".popup__input_type_link"),w=document.querySelector(".popup__input_name_avatar-link"),P=document.getElementById("loading"),I=null;function D(e){var r,a;e.preventDefault(),(r=T.value,a=B.value,fetch("".concat(t.baseUrl,"cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:r,link:a})}).then(n)).then((function(e){p(e,I),u.reset(),v(x)})).catch((function(e){return o(e,"addCard")}))}function H(e){var r;P.textContent="Сохранение...",e.preventDefault(),(r=w.value,fetch("".concat(t.baseUrl,"users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(n)).then((function(e){N(e.name,e.about,e.avatar),i.reset(),v(O)})).catch((function(e){return o(e,"updateUserAvatar")})).finally((function(){P.textContent="Сохранить"}))}function N(e,t,n){J(e,t),function(e){L.src=e}(n)}function J(e,t){g.textContent=e,q.textContent=t}function z(){b.value=g.textContent,S.value=q.textContent,m(k)}function M(e){var r,a;e.preventDefault(),(r=b.value,a=S.value,fetch("".concat(t.baseUrl,"users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:a})}).then(n)).then((function(e){J(e.name,e.about),v(k)})).catch((function(e){return o(e,"updateUserProfile")}))}function V(e){E.src=e.link,E.alt=e.name,C.textContent=e.name,m(A)}r().then((function(e){I=e._id})).catch((function(e){return o(e,"getUserInfo")})),U.addEventListener("click",(function(){return m(x)})),j.addEventListener("click",(function(){return m(O)}))})();