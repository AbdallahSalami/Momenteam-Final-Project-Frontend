import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import EditModal from './editModal/editModalComponent.tsx'; // Adjust the path as necessary
import './articleComponent.css';
import ImageUnivers from '../../assets/Astronmy.jpg';

// Define the Article interface
interface Article {
 id: number;
 memberId: number;
 title: string;
 description: string;
 image: string;
 status: string;
}

// Define the ArticleComponentProps interface
interface ArticleComponentProps {
 article: Article;
 memberId: number;
}

// Define the DecodedToken interface
interface DecodedToken {
 sub: string;
 username: string;
 roleId: string;
 roleName: string;
 memberId: string | null;
}

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article, memberId }) => {
 const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
    const token: string | null = sessionStorage.getItem('token');
    if (token !== null) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
    }
 }, []);

 const handleEditClick = () => {
    setIsEditModalOpen(true);
 };

 const closeEditModal = () => {
    setIsEditModalOpen(false);
 };

 const navigateToArticle = () => {
    navigate(`/article/${article.id}`);
 };

 console.log(article.id)

 const isAuthor = decodedToken?.memberId ? parseInt(decodedToken.memberId) === memberId : false;

 const isDescriptionLong = (description: string) => {
    const words = description.split(' ');
    return words.length > 5;
 };

 if (article.status === 'published' || (isAuthor && article.status === 'draft')) {
    return (
      <MDBCol md='3' className='mainArticleComponent'>
         <MDBCard className="custom-article-card" onClick={navigateToArticle}>
           <img
             src={`http://localhost:8000/storage/images/${article.image}`}
             alt={article.title}
             onError={(e) => {
               e.currentTarget.onerror = null; // Prevent infinite loop if ImageUnivers also fails to load
               e.currentTarget.src = ImageUnivers;
             }}
           />
           <MDBCardBody className="custom-article-body">
             <MDBCardTitle>{article.title}</MDBCardTitle>
             <MDBCardText>
               {isDescriptionLong(article.description) ? (
                 <>
                 {article.description.split(' ').slice(0, 5).join(' ')}...
                 <Link to={`/article/${article.id}`} onClick={(e) => e.stopPropagation()}>See More</Link>
                 </>
               ) : (
                 article.description
               )}
             </MDBCardText>
             {isAuthor && article.status === 'draft' && (
               <button className='btn btn-primary custom-edit-button' onClick={(e) => {e.stopPropagation(); handleEditClick();}}>Edit</button>
             )}
           </MDBCardBody>
         </MDBCard>
         {isEditModalOpen && <EditModal article={article} closeModal={closeEditModal} showEditModal={isEditModalOpen} />}
      </MDBCol>
    );
 }

 return null;
};

export default ArticleComponent;
