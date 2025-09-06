import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Register.css';

function Register({ darkMode }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleRegister(e) {
    e.preventDefault();

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    // TODO: Add Firebase or backend registration logic here
    console.log('Registering user:', email, password);

    // After registration, navigate to features page
    navigate('/features');
  }

  return React.createElement(
    'div',
    { className: `register-container ${darkMode ? 'dark' : 'light'}` },
    React.createElement(
      'div',
      { className: 'register-card' },
      React.createElement('h2', null, 'Create Account'),
      error && React.createElement('p', { className: 'error' }, error),
      React.createElement(
        'form',
        { onSubmit: handleRegister },
        React.createElement('input', {
          type: 'email',
          placeholder: 'Email',
          value: email,
          onChange: (e) => setEmail(e.target.value),
        }),
        React.createElement('input', {
          type: 'password',
          placeholder: 'Password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
        }),
        React.createElement('input', {
          type: 'password',
          placeholder: 'Confirm Password',
          value: confirmPassword,
          onChange: (e) => setConfirmPassword(e.target.value),
        }),
        React.createElement(
          'button',
          { type: 'submit', className: 'register-btn' },
          'Sign Up'
        )
      ),
      React.createElement(
        'p',
        null,
        'Already have an account? ',
        React.createElement(Link, { to: '/login' }, 'Log In')
      )
    )
  );
}

export default Register;
