import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../modalStyle.css';

interface CreateModalProps {
 closeModal: () => void;
 memberId: number | null;
 show: boolean;
}

const CreateModal: React.FC<CreateModalProps> = ({ closeModal, memberId, show }) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [image, setImage] = useState<File | null>(null);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData instance
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    // Append the image file if it exists
    if (image) {
        formData.append('image', image);
    }
    formData.append('status', 'draft');
    formData.append('memberId', memberId?.toString() || ''); // Convert memberId to string and append

    try {
      const response = await axios.post('http://localhost:8000/api/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      if (response.status === 201) {
        closeModal();
      }
    } catch (error) {
      console.error('Error creating the article:', error);
    }
 };

 return (
    <Modal show={show} onHide={closeModal} dialogClassName="create-article-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create Article</Modal.Title>
      </Modal.Header>
      <Modal.Body className="create-article-modal-body">
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
              const target = e.target as HTMLInputElement;
              if (target.files) {
                setImage(target.files[0]);
              }
            }} />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">Create</Button>
        </Form>
      </Modal.Body>
    </Modal>
 );
};

export default CreateModal;
