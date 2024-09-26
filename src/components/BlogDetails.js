import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost, getComments, getUser } from '../services/api'; 
import EditPostModal from './EditPostModal'; // Importa el modal de editar
import DeletePostModal from './DeleteBlog'; // Importa el modal de eliminar
import userImage from '../assets/image/user.jpg';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false); // Estado para el modal de editar
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminar

  useEffect(() => {
    getPost(id).then(response => setPost(response.data));
    getComments(id).then(response => setComments(response.data));
  }, [id]);

  const handleUserClick = (userId) => {
    getUser(userId).then(response => {
      setUser(response.data);
      setShowModal(true); 
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setUser(null);
  };

  const handlePostUpdated = (updatedPost) => {
    setPost(updatedPost);
  };

  const handlePostDeleted = () => {
    // Aquí puedes redirigir al usuario a otra página después de eliminar el post
  };

  return post ? (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">{post.body}</p>
          <button onClick={() => setShowEditModal(true)} className="btn btn-warning me-2">Edit Post</button>
          <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger">Delete Post</button>
        </div>
      </div>

      <h3>Comments</h3>
      <div className="card">
        <div className="card-body">
          <ul className="list-unstyled">
            {comments.map(comment => (
              <li key={comment.id} className="mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <img src={userImage} alt="User Avatar" className="rounded-circle me-2" width="40" height="40" />
                      <strong onClick={() => handleUserClick(comment.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                        {comment.name}
                      </strong>
                      <span className="ms-2 text-muted">({comment.email})</span>
                    </div>
                    <p>{comment.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal para mostrar información del usuario */}
      {showModal && user && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{user.name}</h5>
              </div>
              <div className="modal-body">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {showEditModal && (
        <EditPostModal 
          post={post} 
          onClose={() => setShowEditModal(false)} 
          onPostUpdated={handlePostUpdated} 
        />
      )}

      {/* Modal de eliminación */}
      {showDeleteModal && (
        <DeletePostModal 
          postId={post.id} 
          onClose={() => setShowDeleteModal(false)} 
          onPostDeleted={handlePostDeleted} 
        />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default PostDetails;
