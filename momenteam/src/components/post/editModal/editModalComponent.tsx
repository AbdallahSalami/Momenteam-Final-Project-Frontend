import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../modalStyle.css';

interface Post {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

interface EditPostModalProps {
 post: Post;
 closeModal: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, closeModal }) => {
 const [title, setTitle] = useState(post.title); // Initialize title state
 const [description, setDescription] = useState(post.description); // Initialize description state
 const [image, setImage] = useState<File | null>(null); // Initialize image state as File | null

 const handleClose = () => {
    closeModal();
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('status', 'submitted');
  if (image) {
     formData.append('image', image);
  }

  try {
    const response = await axios.post(`http://localhost:8000/api/posts/${post.id}?_method=PATCH`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      handleClose(); // Close the modal after successful submission
    }
  } catch (error) {
    console.error('Error updating the post:', error);
  }
};  

 return (
    <>
      <Modal show={true} onHide={handleClose} dialogClassName="modal-30w">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
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
    </>
 );
};

export default EditPostModal;
