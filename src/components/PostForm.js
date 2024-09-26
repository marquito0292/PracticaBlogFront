import React, { useState } from 'react';
import { addPost } from '../services/api'; 

function PostForm({ onClose, onPostAdded }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, body };

    addPost(newPost)
      .then((response) => {
        alert('Failed to add post');
        onPostAdded(response.data); 
        onClose(); // Cierra el modal
      })
      .catch((error) => {
        alert('Failed to add post');
        console.error('Add Post Error:', error);
      });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Post</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
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
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">Add Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
