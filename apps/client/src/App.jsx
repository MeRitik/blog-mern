import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail.jsx'
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import NewPost from './pages/NewPost.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username?" element={<Profile />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}