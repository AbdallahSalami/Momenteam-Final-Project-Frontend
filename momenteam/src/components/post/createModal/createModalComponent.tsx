import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../modalStyle.css';

interface CreatePostModalProps {
 closeModal: () => void;
 memberId: number | null;
 show: boolean;
 onPostCreated: (post: Post) => void;
}

interface Post {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ closeModal, memberId, show, onPostCreated }) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [image, setImage] = useState<File | null>(null); // Updated to handle File type
 const [isLoading, setIsLoading] = useState(false); // Loading state
 const [error, setError] = useState(''); // Error state

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Reset error state
    setIsLoading(true); // Set loading state to true

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('memberId', memberId?.toString() || ''); // Ensure memberId is a string
    formData.append('status', 'draft');
    if (image) {
       formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        closeModal();
        const newPost: Post = response.data;
        onPostCreated(newPost);
      }
    } catch (error) {
      console.error('Error creating the post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
 };

 // Basic form validation
 const isFormValid = title && description && image;

 return (
    <Modal show={show} onHide={closeModal} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formImage">
 <Form.Label>Image</Form.Label>
 <Form.Control type="file" onChange={(e) => {
    const target = e.target as HTMLInputElement; // Assert the correct type
    if (target.files) {
      setImage(target.files[0]);
    }
 }} />
</Form.Group>

          {error && <p className="error-message">{error}</p>}
          {isLoading ? (
            <Button variant="primary" type="submit" disabled>
              Creating...
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="submit-button" disabled={!isFormValid}>
              Create
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
 );
};

export default CreatePostModal;
