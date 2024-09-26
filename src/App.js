import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import PostForm from './components/PostForm';
//import UserDetails from './components/UserDetails';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/posts/:id" element={<BlogDetails />} />
          <Route path="/add-post" element={<PostForm />} />
          <Route path="/edit-post/:id" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
