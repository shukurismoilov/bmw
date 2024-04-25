import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/user.store'

import styles from './Users.module.css'
import { useEffect } from 'react'

const UserListPage = () => {

  const {
    all: users,
    allLoading: usersLoading,
    allError: usersError,
    delete: deleteUser,
    getAll: getAllUsers,
    clearAll: clearAllUsers,
    clearAllError: clearAllUsersError,
  } = useUserStore()

  const handleDelete = async (id) => {
    try {
      await deleteUser(id)
      await getAllUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  useEffect(() => {
    return () => {
      clearAllUsers()
      clearAllUsersError()
    }
  }, [])

  return (
    <section>
      <div className={styles.sectionTitle}>
        <h1>Users List</h1>
        <Link className={styles.ctaButton} to="/users/new">New user</Link>
      </div>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>{usersError.message}</div>}
      {users && (
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user.id}`}>📃</Link>
                  <Link to={`/users/${user.id}/edit`}>✏️</Link>
                  <button onClick={() => handleDelete(user.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export { UserListPage }
