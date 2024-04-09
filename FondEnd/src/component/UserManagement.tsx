import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const UserManagement = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['USERS'],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/users"); // Thay đổi endpoint để phù hợp
            return response.data;
        },
    });

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`); // Thay đổi endpoint để phù hợp
            await refetch();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div>
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(users => (
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(users.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
