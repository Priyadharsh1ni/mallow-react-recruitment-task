import React, { useState } from "react";
import styles from '../style'

export default function UserCard({ user, onEdit, onDelete }) {
    const [hovered, setHovered] = useState(false);
  return (
    <div
        style={styles.userCard}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
    <div
        style={{
        ...styles.overlay,
        ...(hovered && {
            opacity: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1,
        }),
        }}
    >        
  <button
          style={{ ...styles.actionEdit }}
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button
          style={{ ...styles.actionDelete }}
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>

      <img src={user?.avatar} alt={user?.name} style={styles.avatar} />
      <h3 style={styles.name}>{user.name}</h3>
      <p style={styles.email}>{user.email}</p>
    </div>
  );
}
