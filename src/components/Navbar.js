// import React, { useState } from 'react';
// import { FaBars, FaTimes, FaMoon, FaSun, FaChevronDown } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = ({ darkMode, setDarkMode }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState('');

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => {
//     setIsOpen(false);
//     setOpenDropdown('');
//   };

//   const toggleDropdown = (name) => {
//     setOpenDropdown(openDropdown === name ? '' : name);
//   };

//   const menuItems = [
//     {
//     name: 'Home',
//     emoji: '🏠',
//     key: 'home',
//     path: '/home',          // simple link, no dropdown
//     links: [],   
//     },
//     {
//       name: 'Authentication',
//       emoji: '🔑',
//       key: 'auth',
//       links: [
//         { name: 'Login', path: '/login' },
//         { name: 'Register', path: '/register' },
//         { name: 'Profile', path: '/profile' },
//       ],
//     },
//     {
//       name: 'Entertainment',
//       emoji: '🎵',
//       key: 'entertainment',
//       links: [
//         { name: 'Music Player', path: '/music' },
//         { name: 'AI Assistant', path: '/ai' },
//       ],
//     },
//     {
//       name: 'Productivity',
//       emoji: '📝',
//       key: 'productivity',
//       links: [
//         { name: 'Notes', path: '/notes' },
//         { name: 'To-Do', path: '/todo' },
//       ],
//     },
//     {
//       name: 'Smart Features',
//       emoji: '🌍',
//       key: 'smart',
//       links: [
//         { name: 'Weather', path: '/weather' },
//         { name: 'News', path: '/news' },
//         { name: 'Daily Quotes', path: '/quotes' },
//       ],
//     },
//     {
//       name: 'Admin',
//       emoji: '⚙️',
//       key: 'admin',
//       links: [{ name: 'Admin Dashboard', path: '/admin' }],
//     },
//   ];

//   return (
//     <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link to="/" className="logo" onClick={closeMenu}>
//           <img
//             src="https://i.ibb.co/Ndxgm5mW/Chat-GPT-Image-Sep-5-2025-01-29-36-PM.png"
//             alt="Hilda Logo"
//           />
//           <h2>Hilda</h2>
//         </Link>

//         {/* Theme Toggle */}
//         <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </div>

//         {/* Hamburger */}
//         <div className="menu-icon" onClick={toggleMenu}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </div>

//         {/* Menu Links */}
//         <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
//           {menuItems.map((item) => (
//             <li key={item.key} className={`nav-item ${openDropdown === item.key ? 'active' : ''}`}>
//               <div className="nav-item-header" onClick={() => toggleDropdown(item.key)}>
//                 <span>{item.emoji} {item.name}</span>
//                 <FaChevronDown className={`dropdown-arrow ${openDropdown === item.key ? 'rotate' : ''}`} />
//               </div>
//               <ul className="dropdown">
//                 {item.links.map((link) => (
//                   <li key={link.name}>
//                     <Link to={link.path} onClick={closeMenu}>{link.name}</Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown('');
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  const menuItems = [
    {
      name: 'Home',
      emoji: '🏠',
      key: 'home',
      path: '/',  // simple link
      links: [],  // no dropdown
    },
    {
      name: 'Authentication',
      emoji: '🔑',
      key: 'auth',
      links: [
        { name: 'Login', path: '/login' },
        { name: 'Register', path: '/register' },
        { name: 'Profile', path: '/profile' },
      ],
    },
    {
      name: 'Entertainment',
      emoji: '🎵',
      key: 'entertainment',
      path: '/entertainment',
      links: [
        { name: 'Music Player', path: '/music' },
        { name: 'AI Assistant',   path: '/aiassistant' },
          { name: 'Video Player', path: '/video' },
        { name: 'Games', path: '/games' },
          { name: 'Podcast', path: '/podcast' },
        { name: 'Fun', path: '/fun' },

      ],
    },
    {
      name: 'Productivity',
      emoji: '📝',
      key: 'productivity',
      links: [
        { name: 'Notes', path: '/notes' },
        { name: 'To-Do', path: '/todo' },
      ],
    },
    {
      name: 'Smart Features',
      emoji: '🌍',
      key: 'smart',
      links: [
        { name: 'Weather', path: '/weather' },
        { name: 'News', path: '/news' },
        { name: 'Daily Quotes', path: '/quotes' },
      ],
    },
    {
      name: 'Admin',
      emoji: '⚙️',
      key: 'admin',
      links: [{ name: 'Admin Dashboard', path: '/admin' }],
    },
  ];

  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img
            src="https://i.ibb.co/Ndxgm5mW/Chat-GPT-Image-Sep-5-2025-01-29-36-PM.png"
            alt="Hilda Logo"
          />
          <h2>Hilda</h2>
        </Link>

        {/* Theme Toggle */}
        <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>

        {/* Hamburger */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu Links */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          {menuItems.map((item) => (
            <li key={item.key} className={`nav-item ${openDropdown === item.key ? 'active' : ''}`}>
              {item.links.length > 0 ? (
                <>
                  {/* Dropdown category */}
                  <div className="nav-item-header" onClick={() => toggleDropdown(item.key)}>
                    <span>{item.emoji} {item.name}</span>
                    <FaChevronDown className={`dropdown-arrow ${openDropdown === item.key ? 'rotate' : ''}`} />
                  </div>
                  <ul className="dropdown">
                    {item.links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.path} onClick={closeMenu}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                // Simple link (Home)
                <Link to={item.path} onClick={closeMenu}>
                  {item.emoji} {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
