import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostComponent from '../../components/post/postComponent.tsx'; // Adjust the import path as necessary
import CreatePostModal from '../../components/post/createModal/createModalComponent.tsx'; // Adjust the import path as necessary
import { jwtDecode } from 'jwt-decode';
import './HomePage.css';

interface Post {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

interface DecodedToken {
 sub: string;
 username: string;
 roleId: string;
 roleName: string;
 memberId: string | null;
}

const HomePage: React.FC = () => {
 const navigate = useNavigate();
 const goContactUs = () => navigate('/contact-us');
 const [posts, setPosts] = useState<Post[]>([]);
 const [showCreatePostModal, setShowCreatePostModal] = useState(false);
 const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 8; // Number of posts per page
 const [totalPages, setTotalPages] = useState(1); // Total number of pages


 const handlePostCreated = (newPost: Post) => {
  console.log('New post created:', newPost);
  // Here you can update the state to include the new post in the list of posts
  // For example:
  setPosts([newPost, ...posts]);
 };


 useEffect(() => {
    const token: string | null = sessionStorage.getItem('token');
    if (token !== null) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
    }
 }, []);

 const memberId = decodedToken?.memberId ? parseInt(decodedToken.memberId) : null;

 useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/posts?page=${currentPage}&limit=${itemsPerPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        if (data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
          // Assuming the server returns a totalPostsCount field
          // Adjust this according to your server's response structure
          const totalPostsCount = data.totalPostsCount;
          const totalPages = Math.ceil(totalPostsCount / itemsPerPage);
          setTotalPages(totalPages);
        } else {
          console.error('Fetched data does not contain an array of posts:', data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
 }, [currentPage]); // Depend on currentPage to refetch posts when it changes

 return (
    <div className='mainHomePage'>
      <div className='mainHomePagePart1'>
        <div className='mainHomePagePart1Text'>
          <h1>Welcome To Momenteam !!</h1>
          <h3> A physics family led by ambition, emerged from the embrace of the Lebanese University and set out towards the world. Here you will find an opportunity to learn new things and dive with us in the world of physics, in a different scientific mold...</h3>
        </div>
        <div className='mainHomePagePart1Image'>
        </div>
      </div>
      <div className='mainHomePagePart2'>
      <h1 className="text-div">Watch  to Know More Who We Are !!</h1>

        <div className='mainVideo'>
        <iframe src="https://drive.google.com/file/d/16uY5OJsHiNDnDcJdLnHC0EoBZe8LKGit/preview"></iframe>
            {/* Other content */}
        </div>
      </div>

      <div className='mainHomePagePart3'>
        <div className='createPostButtonHomePage'>
          <h1>Posts</h1>
          {memberId !== null && (
            <button onClick={() => setShowCreatePostModal(true)}>Create Post</button>
          )}
        </div>

        <div className='mainHomePagePart3Posts'>
        {showCreatePostModal && memberId !== null && (
 <CreatePostModal
    closeModal={() => setShowCreatePostModal(false)}
    memberId={memberId}
    show={showCreatePostModal}
    onPostCreated={handlePostCreated} // Pass the function here
 />
)}
          {posts.map(post => (
            <PostComponent key={post.id} post={post} memberId={post.memberId} />
          ))}
        </div>
      </div>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className='mainHomePagePart4'>
        <div className='mainHomePagePart4TextAndButtonSide'>
          <div className='mainHomePagePart4TextSide'>
            <h1>aaaaa</h1>
          </div>
          <div className='mainHomePagePart4ButtonSide'>
            <button className='mainHomePagePart4Button' onClick={goContactUs}>Click Here</button>
          </div>
        </div>
        <div className='mainHomePagePart4ImageSide'>
          {/* Content for mainHomePagePart4ImageSide */}
        </div>
      </div>
    </div>
 );
}

export default HomePage;
