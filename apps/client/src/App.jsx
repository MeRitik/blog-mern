import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail.jsx'
import HomePage from './pages/HomePage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}