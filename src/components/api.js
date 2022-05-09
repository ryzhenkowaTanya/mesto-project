const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort7/',
    headers: {
        authorization: 'ea769cc4-10ce-4fe4-88ef-99f1e88db45d',
        'Content-Type': 'application/json'
    }
}

export const toJson = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject({
        status: res.status,
        statusText: res.statusText
    });
}

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}users/me`, {
        headers: config.headers
    })
        .then(toJson)
}

export const getCards = () => {
    return fetch(`${config.baseUrl}cards`, {
        headers: config.headers
    })
        .then(toJson);
}

export const updateUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
        .then(toJson);
}

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
        .then(toJson);
}


export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(toJson);
}

export const setLike = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(toJson);
}

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(toJson);
}


export const updateUserAvatar = (url) => {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar: url})
    })
        .then(toJson);
}



