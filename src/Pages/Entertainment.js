import React from 'react';
import '../Styles/Entertainment.css';

function Entertainment({ darkMode }) {
  const features = [
    {
      name: 'Music Player',
      
      desc: 'Listen to your favorite tracks anytime, with playlists and controls.',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
       path: '/musicplayer'
    },
    {
      name: 'AI Assistant',
      desc: 'Chat and interact with Hilda AI, with text and voice capabilities.',
      img: 'https://images.unsplash.com/photo-1581091215365-5b8f32f7a58f?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Video Player',
      desc: 'Watch videos, trailers, or tutorials directly in Hilda.',
      img: 'https://images.unsplash.com/photo-1599058917213-3f0088a74aa6?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Games & Mini-Games',
      desc: 'Enjoy fun and interactive mini-games for quick entertainment.',
      img: 'https://images.unsplash.com/photo-1606813900443-6d7fae33a0df?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Podcasts & Audiobooks',
      desc: 'Listen to podcasts or audiobooks from popular genres.',
      img: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Quizzes & Fun Challenges',
      desc: 'Take personality or knowledge quizzes for fun and learning.',
      img: 'https://images.unsplash.com/photo-1581091012184-0df13401e4b0?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return React.createElement(
    'div',
    { className: `entertainment-container ${darkMode ? 'dark' : 'light'}` },

    React.createElement('h1', null, '🎵 Entertainment'),

    React.createElement('p', { className: 'entertainment-desc' },
      'Explore music, AI, videos, games, podcasts, and quizzes to boost your fun.'
    ),

    React.createElement(
      'div',
      { className: 'entertainment-cards' },
      features.map((feature) =>
        React.createElement(
          'div',
          { key: feature.name, className: 'card' },
          React.createElement('img', { src: feature.img, alt: feature.name }),
          React.createElement('h3', null, feature.name),
          React.createElement('p', null, feature.desc)
        )
      )
    )
  );
}

export default Entertainment;
