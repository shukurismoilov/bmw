import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores'

import styles from './Users.module.css'
import { useEffect } from 'react'

const EditUserPage = () => {
  const {
    one: user,
    oneLoading: userLoading,
    // oneError: userError,
    clearOne: clearOneUser,
    clearOneError: clearOneUserError,
    edit: editUser,
    editLoading: editUserLoading,
    editError: editUserError,
    clearEditError: clearEditUserError,
  } = useUserStore()

  const [editData, setEditData] = useState(user)
  const navigate = useNavigate()

  const handleEditUser = async (id) => {
    const edittedUser = await editUser(id, editData)
    if (edittedUser.id) {
      navigate('/')
    } else {
      console.log(editUserError);
    }
  }

  useEffect(() => {
    return () => {
      clearOneUser()
      clearOneUserError()
      clearEditUserError()
    }
  }, [])

  return (
    <section>
      <div className={styles.sectionTitle}>
        <h1>Edit user</h1>
        <button
          className={styles.actionButton}
          disabled={editUserLoading || userLoading}
          onClick={() => {
            editData.id && handleEditUser(editData.id)
          }}
        >
          Submit
        </button>
      </div>
      <form className={styles.actionForm}>
        <input
          type="text"
          placeholder="Name*"
          value={editData?.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Login*"
          value={editData?.login}
          onChange={(e) => setEditData({ ...editData, login: e.target.value })}
          required
        />
        <input
          type="mail"
          placeholder="Email*"
          value={editData?.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Password*"
          value={editData?.password}
          onChange={(e) => setEditData({ ...editData, password: e.target.value })}
          required
        />
        {/* <select
        // value={editData?.age}
        // onChange={(e) => setEditData({ ...editData, age: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select> */}
        <input
          type="number"
          placeholder="Age"
          value={editData?.age}
          onChange={(e) => setEditData({ ...editData, age: e.target.value })}
        />
      </form>
    </section>
  )
}

export { EditUserPage }
