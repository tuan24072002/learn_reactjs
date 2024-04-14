import axios from '../utils/axiosCustomize'


//Admin
const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}
const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}
const postCreateUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}
const putUpdateUser = (username, role, image, id) => {
    const data = new FormData();
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    data.append('id', id);
    return axios.put('api/v1/participant', data)
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } })
}

//Authenticate
const postLogin = (email, password) => {
    let delay = 3000;
    return axios.post('api/v1/login', { email, password, delay })
}
const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', { email, password, username })
}

//Quiz
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDetailQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, { ...data });
}
const postCreateQuiz = (description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty)
    data.append('quizImage', quizImage);
    return axios.post(`api/v1/quiz`, data)
}
const getAllQuiz = () => {
    return axios.get(`api/v1/quiz/all`);
}
const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    data.append('id', id);
    return axios.put('api/v1/quiz', data)
}
const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}
export {
    postCreateUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getUserPaginate,
    postLogin,
    postRegister,
    getQuizByUser,
    getDetailQuiz,
    postSubmitQuiz,
    postCreateQuiz,
    getAllQuiz,
    putUpdateQuiz,
    deleteQuiz,
}