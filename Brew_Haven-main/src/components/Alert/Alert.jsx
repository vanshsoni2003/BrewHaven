import React from 'react';
import './Alert.css';

const Alert = ({ type = 'success', message, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <span className="alert-close" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Alert;
