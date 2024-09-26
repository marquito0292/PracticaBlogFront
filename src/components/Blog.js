import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/PostList.css';  
import PostForm from './PostForm'; // Importa el formulario para agregar un post
import blogImage from '../assets/image/blog.jpg';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    getPosts().then(response => setPosts(response.data));
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]); // Agregar el nuevo post a la lista
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Blog Test</h1> {/* Título agregado */}
      <button onClick={() => setShowModal(true)} className="btn btn-success mb-4">Add Post</button>
      <div className="row clearfix">
        <div className="col-lg-10 col-md-12 mx-auto"> {/* Centrar contenido */}
          {posts.map(post => (
            <div key={post.id} className="card single_post mb-4"> {/* Espacio entre tarjetas */}
              <div className="body">
                <div className="img-post">
                  <img
                    className="d-block img-fluid"
                    src={blogImage}
                    alt="Post"
                  />
                </div>
                <h3>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h3>
                <p>{post.body}</p>
                <div className="footer">
                  <ul className="meta list-inline">
                    <li className="list-inline-item">
                      <a href="javascript:void(0);">
                        <i className="fa fa-calendar"></i> {new Date().toDateString()}
                      </a>
                    </li>
                  </ul>
                  {/* Botón para ver comentarios */}
                  <Link to={`/posts/${post.id}`} className="btn btn-primary mt-3">
                    Ver comentarios
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar un nuevo post */}
      {showModal && (
        <PostForm onClose={() => setShowModal(false)} onPostAdded={handlePostAdded} />
      )}
    </div>
  );
}

export default Blog;
