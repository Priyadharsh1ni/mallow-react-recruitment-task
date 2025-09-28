import "./style.css";

function UserList({ user, onEdit, onDelete }) {
  return (
    <tr className="user-row">
      <td>
        <img src={user.avatar} alt={user.first_name} className="user-avatar" />
      </td>
      <td>
        <a href={`mailto:${user.email}`} className="user-email">
          {user.email}
        </a>
      </td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td className="actions">
        <button className="btn edit" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn delete" onClick={() => onDelete(user.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default UserList;
