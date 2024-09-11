import React, {useEffect, useState} from 'react';
import {userService} from '../services/userService';

const AdminUserManager = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await userService.getUsers();
            (Array.isArray(response.data))
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    const toggleUserBlock = async (userId, isActive) => {
        const updatedUser = await userService.toggleBlockUser(userId, isActive);
        const updatedUsers = users.map(user => (user.id === userId ? updatedUser : user));
        setUsers(updatedUsers);
    };

    const toggleUserField = async (userId, field, value) => {

        const updatedUser = await userService.updateUserField(userId, field, value);
        const updatedUsers = users.map(user => (user.id === userId ? updatedUser : user));
        setUsers(updatedUsers);
    };

    const table = {
        border: "1px solid grey",
        textAlign: "center",
    }
    const th_td = {
        border: "1px solid grey",
        textAlign: "center",
        padding: "10px"
    }

    return (
        <div>
            <h2>User Management</h2>
            <table style={table}>
                <thead style={{
                    display: "table - header - group",
                    verticalAlign: "middle",
                    borderColor: "inherit"
                }}>
                <tr>
                    <th style={th_td}>ID</th>
                    <th style={th_td}>Email</th>
                    <th style={th_td}>Active</th>
                    <th style={th_td}>Seller premium</th>
                    <th style={th_td}>Staff</th>
                    <th style={th_td}>Superuser</th>
                    <th style={th_td}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td style={th_td}>{user.id}</td>
                        <td style={th_td}>{user.email}</td>
                        <td style={th_td}>{user.is_active ? 'Active' : 'Blocked'}</td>
                        <td style={th_td}>{user.is_seller_premium ? 'Yes' : 'No'}</td>
                        <td style={th_td}>{user.is_staff ? 'Staff' : 'User'}</td>
                        <td style={th_td}>{user.is_superuser ? 'Superuser' : 'User'}</td>
                        <td style={th_td}>
                            <button style={th_td} onClick={() => toggleUserBlock(user.id, user.is_active)}>
                                {user.is_active ? 'Block' : 'Unblock'}
                            </button>
                            <button style={th_td}
                                    onClick={() => toggleUserField(user.id, 'is_seller_premium', !user.is_seller_premium)}>
                                Seller Premium (Yes/No)
                            </button>
                            <button style={th_td} onClick={() => toggleUserField(user.id, 'is_staff', !user.is_staff)}>
                                Staff/User
                            </button>
                            <button style={th_td}
                                    onClick={() => toggleUserField(user.id, 'is_superuser', !user.is_superuser)}>
                                Superuser/User
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export {AdminUserManager};