import React, { useState, useEffect } from 'react';
import { Button, Modal, Card } from 'react-bootstrap';
import axios from 'axios';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  const UNSPLASH_API_KEY = 'b1__kABUj6_VsSuXkk6ueGx_CCuB96JgntUc5HUKlcA';

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handlePostClick = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPost(data);
        axios
          .get(
            `https://api.unsplash.com/photos/random?query=${data.title}&client_id=${UNSPLASH_API_KEY}`
          )
          .then((response) => {
            if (response.data && response.data.length > 0) {
              setImage(response.data[0]?.urls?.regular);
            } else {
              setImage('https://via.placeholder.com/600x400?text=Imagen+por+defecto');
            }
          })
          .catch(() => {
            setImage('https://via.placeholder.com/600x400?text=Imagen+por+defecto');
          });

        setShowModal(true);
      });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Publicaciones</h1>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handlePostClick(post.id)}
                >
                  Ver detalles
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <img
              src={image}
              alt="Imagen del Post"
              className="img-fluid mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
          <p>
            <strong>Fecha del evento:</strong> {new Date().toLocaleDateString()}
          </p>
          <p>{selectedPost?.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostsPage;
