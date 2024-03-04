import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
 MDBCard,
 MDBCardTitle,
 MDBCardText,
 MDBCardOverlay,
 MDBCardImage
} from 'mdb-react-ui-kit';
import axios from 'axios';
import UniversImage from '../../assets/Astronmy.jpg';
import './SingleArticlePage.css';

interface Article {
 id: number;
 title: string;
 description: string;
 image: string; // Added image proper
 // Add other fields as needed
}

const SingleArticlePage: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 const [article, setArticle] = useState<Article | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setError('Article ID is missing');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}`);
        setArticle(response.data.article);
      } catch (error) {
        console.error('Failed to fetch article:', error);
        setError('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
 }, [id]);

 if (loading) {
    return <div>Loading...</div>;
 }

 if (error) {
    return <div>Error: {error}</div>;
 }

 return (
    <MDBCard background='dark' className='text-white articleSingle-page custom-card'>
      <MDBCardImage overlay
    src={article ? `http://localhost:8000/storage/images/${article.image}` : UniversImage}
    alt={article?.title}
    onError={(e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop if ImageUnivers also fails to load
        e.currentTarget.src = UniversImage;
    }}
    className="custom-image" />

      <MDBCardOverlay>
        <MDBCardTitle className="custom-title">{article?.title}</MDBCardTitle>
        <MDBCardText className="custom-text">
          {article?.description}
        </MDBCardText>
        {/* Render other article details as needed */}
      </MDBCardOverlay>
    </MDBCard>
);



};

export default SingleArticlePage;
