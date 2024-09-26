import React from 'react';
import { deletePost } from '../services/api'; // Importar la función para eliminar el post

function DeleteBlog({ postId, onClose, onPostDeleted }) {
  const handleDelete = () => {
    deletePost(postId).then(() => {
      // Mostrar un toast o alerta de éxito
      alert('Post deleted successfully (simulation)');
      
      onPostDeleted(postId); // Informar al componente padre que el post ha sido eliminado
      onClose(); // Cerrar el modal
    });
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBlog;
