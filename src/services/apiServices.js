import axios from '../utils/axiosCustomize'
//Admin
const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}
const getDashBoardOverview = () => {
    return axios.get(`api/v1/overview`)
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
const postLogout = (email, refreshToken) => {
    return axios.post(`api/v1/logout`, {
        email: email,
        refresh_token: refreshToken
    })
}

//Quiz
const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}
const getDetailQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}
const getQuizWithQA = (id) => {
    return axios.get(`api/v1/quiz-with-qa/${id}`);
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
const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}
//////Upsert = update + insert
const postUpsertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`, { ...data })
}
//Question
const postQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    return axios.post(`api/v1/question`, data)
}

//Answer
const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post(`api/v1/answer`, {
        description, correct_answer, question_id
    })
}

//User
const postUpdateUser = (username, userImage) => {
    const data = new FormData();
    data.append(`username`, username);
    data.append(`userImage`, userImage);
    return axios.post(`api/v1/profile`, data)
}
const postChangePasswordUser = (current_password, new_password) => {
    return axios.post(`api/v1/change-password`, { current_password, new_password })
}
const getHistory = () => {
    return axios.get(`api/v1/history`);
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
    postQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuizToUser,
    getQuizWithQA,
    postUpsertQA,
    postLogout,
    getDashBoardOverview,
    postUpdateUser,
    postChangePasswordUser,
    getHistory
}