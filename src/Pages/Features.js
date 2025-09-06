import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Features.css';

function Feature({ darkMode }) {
  const features = [
    {
      category: 'Entertainment',
      items: [
        { 
          name: 'Music Player', 
          img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
          path: '/musicplayer'
        },
        { 
          name: 'AI Assistant', 
          img: 'https://i.ibb.co/tM8z29qh/ai.jpg',
          path: '/aiassistant'
        },
        { 
          name: 'Video Player', 
          img: 'https://i.ibb.co/yBZfY5nH/video.jpg',
          path: '/videoplayer'
        },
        { 
          name: 'Games', 
          img: 'https://i.ibb.co/GfyQLKYv/game.png',
          path: '/games'
        },
        { 
          name: 'Podcasts & Audiobooks', 
          img: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80',
          path: '/podcasts'
        },
        { 
          name: 'Quizzes & Fun Challenges', 
          img: 'https://i.ibb.co/RpdMCLz9/quiz.jpg',
          path: '/quizzes'
        },
      ],
    },
    {
      category: 'Productivity',
      items: [
        { name: 'Notes', img: 'https://i.ibb.co/BHkW3Gpm/product.jpg', path: '/notes' },
        { name: 'To-Do', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80', path: '/todo' },
      ],
    },
    {
      category: 'Smart Features',
      items: [
        { name: 'Weather', img: 'https://i.ibb.co/1YZWYq4G/weather.png', path: '/weather' },
        { name: 'News', img: 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=800&q=80', path: '/news' },
        { name: 'Daily Quotes', img: 'https://i.ibb.co/zV4cq934/quote.jpg', path: '/quotes' },
      ],
    },
    {
      category: 'Admin',
      items: [
        { name: 'Admin Dashboard', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80', path: '/admin' },
      ],
    },
  ];

  return React.createElement(
    'div',
    { className: `feature-container ${darkMode ? 'dark' : 'light'}` },

    React.createElement('h1', null, '🌟 Explore Features'),

    React.createElement(
      'div',
      { className: 'feature-categories' },
      features.map((feature) =>
        React.createElement(
          'div',
          { key: feature.category, className: 'feature-category' },
          React.createElement('h2', null, feature.category),
          React.createElement(
            'div',
            { className: 'feature-items' },
            feature.items.map((item) =>
              React.createElement(
                Link,
                { key: item.name, to: item.path || '#', className: 'feature-card-link' },
                React.createElement(
                  'div',
                  { className: 'feature-card' },
                  React.createElement('img', { src: item.img, alt: item.name }),
                  React.createElement('h3', null, item.name)
                )
              )
            )
          )
        )
      )
    )
  );
}

export default Feature;
