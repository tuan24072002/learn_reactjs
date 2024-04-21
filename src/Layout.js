import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/User/ManageUser';
import Login from './components/Auth/Login'
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import PrivateRouteAdmin from './routes/PrivateRouteAdmin';

const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3'>
            (404) Not found data with your current URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admins" element={
                    <PrivateRouteAdmin>
                        <Admin />
                    </PrivateRouteAdmin>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path='manage-quizzes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Suspense>
    )
}

export default Layout