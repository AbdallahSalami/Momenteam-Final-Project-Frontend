import React from 'react';
import './SinglePostModal.css'; // Import the CSS file
import  postImaggee from '../../assets/posssssst.jpg'
// Define the Post interface within the same file
interface Post {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string; // Assuming this is the URL or path to the image
 status: string;
}

// Define the props for the SinglePostModal component
interface SinglePostModalProps {
 post: Post;
 closeModal: () => void;
}

// SinglePostModal component
const SinglePostModal: React.FC<SinglePostModalProps> = ({ post, closeModal }) => {
 return (
    <div className="single-post-modal-container" onClick={closeModal}>
    <img
    src={post ? `http://localhost:8000/storage/images/${post.image}` : postImaggee }
       alt={post?.title}
       onError={(e) => {
           e.currentTarget.onerror = null; // Prevent infinite loop if ImageUnivers also fails to load
           e.currentTarget.src = postImaggee;
       }}
       className='cardSingleImage'

       />
      <div className="single-post-modal-header" onClick={(e) => e.stopPropagation()}>
        <h2>{post.title}</h2>
      </div>
      <div className="single-post-modal-body" onClick={(e) => e.stopPropagation()}>
        <p>{post.description}</p>
        {/* Render the post's image */}
      </div>
      <div className="single-post-modal-footer" onClick={(e) => e.stopPropagation()}>
        <button className="single-post-modal-close-button" onClick={closeModal}>Close</button>
      </div>
    </div>
 );
};

export default SinglePostModal;
