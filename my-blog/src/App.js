import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/articles" element={<ArticlesListPage />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
