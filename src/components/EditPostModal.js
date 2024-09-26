import React, { useState, useEffect } from 'react';
import { updatePost } from '../services/api'; 

function EditPostModal({ post, onClose, onPostUpdated }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { ...post, title, body };

    updatePost(post.id, updatedPost).then(() => {
      // Mostrar un toast o alerta de éxito
      alert('Post updated successfully');
      
      onPostUpdated(updatedPost); // Actualizar el post en el componente padre
      onClose(); // Cerrar el modal
    }).catch(error => {
      // Manejar errores, si hay
      alert('Failed to update post');
      console.error('Update Error:', error);
    });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Post</h5>
            <button type="button" className="btn-close" onClick={onClose}></button> 
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Campo de título */}
              <div className="form-group mb-3">
                <label htmlFor="postTitle" className="form-label">Title</label>
                <input
                  type="text"
                  id="postTitle"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              {/* Campo de cuerpo */}
              <div className="form-group mb-3">
                <label htmlFor="postBody" className="form-label">Body</label>
                <textarea
                  id="postBody"
                  className="form-control"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows="4"
                  required
                />
              </div>
              {/* Footer del modal con los botones */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPostModal;
