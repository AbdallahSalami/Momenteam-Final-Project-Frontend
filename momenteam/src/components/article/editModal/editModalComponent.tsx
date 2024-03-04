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
 const [image, setImage] = useState(article.image);

 const handleClose = () => {
    closeModal(); // Close the modal by calling the closeModal function from the parent component
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare the data to be sent in the PATCH request
    const data: Partial<Article> = {
      title,
      description,
      image,
      status: 'submitted', // Assuming you want to update the status to 'submitted' upon editing
    };

    try {
      const response = await axios.patch(`http://localhost:8000/api/articles/${article.id}`, data);

      if (response.status === 200) {
        handleClose(); // Close the modal after successful submission
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
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
 );
};

export default EditModal;
