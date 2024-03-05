import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../modalStyle.css';

interface Article {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

interface EditModalProps {
 article: Article;
 closeModal: () => void;
 showEditModal: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ article, closeModal, showEditModal }) => {
 const [title, setTitle] = useState(article.title);
 const [description, setDescription] = useState(article.description);
 const [image, setImage] = useState<File | null>(null); // Change to File type

 const handleClose = () => {
    closeModal();
 };

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
    formData.append('status', 'submitted');

    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${article.id}?_method=PATCH`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error('Error submitting the article:', error);
    }
 };

 return (
    <Modal show={showEditModal} onHide={handleClose} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
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
            // Assert the correct type for the event target
           const target = e.target as HTMLInputElement;
            if (target.files) {
            setImage(target.files[0]);
            }
            }} />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
 );
};

export default EditModal;
