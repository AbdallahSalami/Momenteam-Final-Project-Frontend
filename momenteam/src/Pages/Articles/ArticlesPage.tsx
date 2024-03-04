import React, { useState, useEffect } from 'react';
import './ArticlesPage.css';
import { jwtDecode } from 'jwt-decode';
import ArticleComponent from '../../components/article/articleComponent.tsx';
import CreateModal from '../../components/article/createModal/createModalComponent.tsx'; // Adjust the import path as necessary

interface Article {
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

const ArticlesPage: React.FC = () => {
 const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
 const [articles, setArticles] = useState<Article[]>([]);
 const [showCreateModal, setShowCreateModal] = useState(false);

 useEffect(() => {
    const token: string | null = sessionStorage.getItem('token');
    if (token !== null) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
    }
 }, []);

 const memberId = decodedToken?.memberId ? parseInt(decodedToken.memberId) : null;

 const handleCreateModalClose = () => {
    setShowCreateModal(false);
 };

 const handleCreateModalOpen = () => {
    setShowCreateModal(true);
 };

 useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error('Fetched data does not contain an array of articles:', data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
 }, []);

 return (
    <div className='mainArtilcesPage'>
      <div className='createMainArticleButton'>
        <h1> Articles </h1>
        <button  onClick={handleCreateModalOpen}>Create Article</button>
      </div>
      <div className='mainArtilcesPageComponent'>
          {articles.map(article => (
            <ArticleComponent key={article.id} article={article} memberId={article.memberId} />
          ))}
      </div>
      <div className='createModalComponent'>
      {showCreateModal && memberId !== null && (
        <CreateModal closeModal={handleCreateModalClose} memberId={memberId} show={showCreateModal} />
      )}
      </div>
     
    </div>
 );
};

export default ArticlesPage;
