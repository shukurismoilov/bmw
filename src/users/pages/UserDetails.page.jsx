import { useEffect } from 'react'
import { useUserStore } from '../stores'

import styles from './Users.module.css'
// import { Link } from 'react-router-dom'

const UserDetailsPage = () => {
  const {
    one: user,
    oneLoading: userLoading,
    oneError: userError,
    clearOne: clearOneUser,
    clearOneError: clearOneUserError,
  } = useUserStore()

  useEffect(() => {
    return () => {
      clearOneUser() 
      clearOneUserError()
    }
  }, [])

  return (
    <section>
      {userLoading && <p>Loading user details...</p>}
      {userError && <p>{userError.message}</p>}
      {user && (
        <>
          <div className={styles.sectionTitle}>
            <h1>User Details</h1>
            {/* <Link to={`/users/${user.id}/edit`} className={styles.ctaButton}>Edit user</Link> */}
          </div>
          <div>
            <h2>Name: {user.name}</h2>
            <p>Login: {user.login}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
          </div>
        </>
      )}
    </section>
  )
}

export { UserDetailsPage }
