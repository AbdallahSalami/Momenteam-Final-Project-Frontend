import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../modalStyle.css'

interface CreateModalProps {
 closeModal: () => void;
 memberId: number | null; // Allow memberId to be null
 show: boolean; // Add this line to include the 'show' property
}

const CreateModal: React.FC<CreateModalProps> = ({ closeModal, memberId, show }) => {
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [image, setImage] = useState('');

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/articles', {
        title,
        description,
        image,
        status: 'draft', // Set the status to 'draft' upon creation
        memberId, // Include memberId in the request payload
      });

      if (response.status === 201) {
        closeModal(); // Close the modal after successful creation
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
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">Create</Button>
        </Form>
      </Modal.Body>
    </Modal>
 );
};

export default CreateModal;
