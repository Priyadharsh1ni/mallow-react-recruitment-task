import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';
import { logout } from '../features/auth/authSlice';
import styles from './style'
import Form from '../components/Form';
import { createUser, updateUser } from '../features/users/usersSlice';
import UserCard from '../components/users/UserCard';
import UserList from '../components/users/UserListItem';

const UsersListPage = () => {
    const dispatch = useDispatch();
    const { list: users, loading, page, totalPages } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);

    const [view, setView] = useState('list'); // 'list' or 'card'
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers(1));
    }, [dispatch]);

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(user =>
            user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);
    console.log("🚀 ~ UsersListPage ~ filteredUsers:", filteredUsers)

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(fetchUsers(newPage));
        }
    };

    const handleOpenModal = (user = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId));
        }
    };

    if (loading && users.length === 0) return <div style={styles.loader}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.userInfo}>
                <header style={styles.navbar}>
                    <h1 style={styles.title}>Users</h1>

                    <div style={styles.navActions}>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                        <button style={styles.button} onClick={() => setView('list')}>Table</button>
                        <button style={styles.button} onClick={() => setView('card')}>Card</button>
                        <button style={styles.addButton} onClick={() => handleOpenModal()}>+ Create User</button>
                    </div>
                </header>

                {view === 'list' ? <div style={styles.listContainer}>
                    {filteredUsers.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: "12px 16px", textAlign: "left" }}>Avatar</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left" }}>Email</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left" }}>First Name</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left" }}>Last Name</th>
                                    <th style={{ padding: "12px 16px", textAlign: "left" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <UserList
                                        key={user.id}
                                        user={user}
                                        onEdit={handleOpenModal}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}</div> : <div style={styles.cardContainer}>{filteredUsers.map(user => (
                        <UserCard key={user.id} user={user} onEdit={handleOpenModal} onDelete={handleDelete} />))} </div>}

                <div style={styles.pagination}>
                    <button style={styles.pageButton} onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>Prev</button>
                    <span>Page {page} of {totalPages}</span>
                    <button style={styles.pageButton} onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>Next</button>
                </div>
            </div>
            {isModalOpen && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modal}>
                        <Form
                            user={editingUser}
                            onClose={handleCloseModal}
                            onSubmit={(data) => {
                                if (editingUser) {
                                    dispatch(updateUser({ id: editingUser.id, data }));
                                } else {
                                    dispatch(createUser(data));
                                }
                                handleCloseModal();
                            }}
                        />
                        <button style={styles.button} onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersListPage;