const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';

const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}

export {
    FETCH_USER_LOGIN_SUCCESS,
    doLogin
}