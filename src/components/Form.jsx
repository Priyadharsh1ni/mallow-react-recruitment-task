import React, { useState, useEffect } from 'react';
import styles from './style';

const UserModal = ({ user = null, onClose, onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setProfileImage(user.avatar || '');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setProfileImage('');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      first_name: firstName,
      last_name: lastName,
      email,
      avatar: profileImage,
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>{user ? 'Edit User' : 'Create User'}</h2>
          <button style={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            First Name <span style={styles.required}>*</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Last Name <span style={styles.required}>*</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Email <span style={styles.required}>*</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Profile Image Link <span style={styles.required}>*</span>
            <input
              type="url"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <div style={styles.buttons}>
            <button type="button" style={styles.cancelButton} onClick={onClose}>Cancel</button>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;