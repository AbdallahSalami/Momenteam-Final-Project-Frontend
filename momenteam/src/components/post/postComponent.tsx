import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './postComponent.css';
import {
 MDBCard,
 MDBCardImage,
 MDBCardBody,
 MDBCardTitle,
 MDBCardText,
 MDBCardFooter,
 MDBCol
} from 'mdb-react-ui-kit';
import PostImage from '../../assets/posssssst.jpg';
import SinglePostModal from '../../Pages/SinglePost/SinglePostModal'; // Adjust the import path as necessary
import EditPostModal from './editModal/editModalComponent.tsx'

interface Post {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

interface PostComponentProps {
 post: Post;
 memberId: number;
}

interface DecodedToken {
 sub: string;
 username: string;
 roleId: string;
 roleName: string;
 memberId: string | null;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, memberId }) => {
 const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
 const [isPostModalOpen, setIsPostModalOpen] = useState(false); // State to control modal visibility
 const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility

 useEffect(() => {
    const token: string | null = sessionStorage.getItem('token');
    if (token !== null) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
    }
 }, []);

 const handlePostClick = () => {
    setIsPostModalOpen(true); // Open the single image component modal
 };

 const handleEditClick = () => {
    setIsEditModalOpen(true); // Open the edit modal
 };

 const closePostModal = () => {
    setIsPostModalOpen(false); // Close the single image component modal
 };

 const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
 };

 // Determine if the current user is the author of the post
 const isAuthor = decodedToken?.memberId ? parseInt(decodedToken.memberId) === memberId : false;

 // Function to check if the description is too long
 const isDescriptionLong = (description: string) => {
    const words = description.split(' ');
    return words.length > 5;
 };

 // Adjusted logic to display posts based on status and authorship
 if (post.status === 'published' || (isAuthor && post.status === 'draft')) {
    return (
      <MDBCol className="mainPostCard">
        <MDBCard className='post-card h-100' onClick={handlePostClick}>
          <MDBCardImage
        src={post ? `http://localhost:8000/storage/images/${post.image}` : PostImage }
        alt={post?.title}
        onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop if ImageUnivers also fails to load
            e.currentTarget.src = PostImage;
        }}
            className='card-image'
          />
          <MDBCardBody className='card-body'>
            <MDBCardTitle>{post.title}</MDBCardTitle>
            <MDBCardText>
              {isDescriptionLong(post.description) ? (
                <>
                 {post.description.split(' ').slice(0, 5).join(' ')}...
                 <a href="#" onClick={(e) => e.preventDefault()}>See More</a>
                </>
              ) : (
                post.description
              )}
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className='card-footer'>
            <small className='text-muted'>Status: {post.status}</small>
            {isAuthor && post.status === 'draft' && (
              <button className='btn btn-primary' onClick={(e) => {e.stopPropagation(); handleEditClick();}}>Edit</button>
            )}
          </MDBCardFooter>
        </MDBCard>
        {isPostModalOpen && <SinglePostModal post={post} closeModal={closePostModal} />}
        {isEditModalOpen && <EditPostModal post={post} closeModal={closeEditModal} />}
      </MDBCol>
    );
 }

 return null; // Return null if the post does not meet the criteria
};

export default PostComponent;
