export function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    form.addEventListener('submit', event => handleFormSubmit(event, config));
    form.addEventListener('input', event => handleFormInput(event, config));
}

export function handleFormSubmit(event, config) {
    event.preventDefault();
    const form = event.currentTarget;
    const isValid = form.checkValidity();
    const button = form.querySelector(config.submitButtonSelector)
    button.setAttribute('disabled', 'disabled');
    form.reset()
}

function handleFormInput(event, config) {
    const input = event.target;
    const form = event.currentTarget
    setFieldError(form, config, input)
    setSubmitButtonState(form, config)
}

function setFieldError(form, config, input) {
    const span = document.querySelector(`#${input.id}-error`)
    span.textContent = input.validationMessage;

    if (input.validity.valid) {
        input.classList.remove(config.inputErrorClass);
    } else {
        input.classList.add(config.inputErrorClass);
    }
}

export function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector) //
    const isValid = form.checkValidity()

    if (isValid) {
        button.classList.add(config.validButtonClass);
        button.classList.remove(config.invalidButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.remove(config.validButtonClass);
        button.classList.add(config.invalidButtonClass);
        button.setAttribute('disabled', 'disabled');
    }
}

enableValidation({
    formSelector: '.popup__form[name="editInfo"]',
    submitButtonSelector: '.popup__button',
    validButtonClass: 'popup_button_valid',
    invalidButtonClass: 'popup_button_invalid',
    inputErrorClass: 'popup__input_type_error',
})

enableValidation({
    formSelector: '.popup__form[name="insertInfo"]',
    submitButtonSelector: '.popup__button',
    validButtonClass: 'popup_button_valid',
    invalidButtonClass: 'popup_button_invalid',
    inputErrorClass: 'popup__input_type_error',
})



