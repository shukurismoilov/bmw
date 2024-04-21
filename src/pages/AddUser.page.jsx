import { useState } from 'react'
import { useUserStore } from '../stores'

import styles from './Users.module.css'

const AddUserPage = () => {
  const {
    add: addUser,
    addLoading: addUserLoading,
    // addError: addUserError,

  } = useUserStore()

  const [addData, setAddData] = useState()

  const handleAddUser = async () => {
    await addUser(addData)
  }

  return (
    <section>
      <div className={styles.sectionTitle}>
        <h1>New user</h1>
        <button
          className={styles.actionButton}
          disabled={addUserLoading}
          onClick={handleAddUser}
        >
          Add
        </button>
      </div>
      <form className={styles.actionForm}>
        <input
          type="text"
          placeholder="Name*"
          value={addData?.name || ""}
          onChange={(e) => setAddData({ ...addData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Login*"
          value={addData?.login || ""}
          onChange={(e) => setAddData({ ...addData, login: e.target.value })}
          required
        />
        <input
          type="mail"
          placeholder="Email*"
          value={addData?.email || ""}
          onChange={(e) => setAddData({ ...addData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Password*"
          value={addData?.password || ""}
          onChange={(e) => setAddData({ ...addData, password: e.target.value })}
          required
        />
        {/* <select
        // value={addData?.age || ""}
        // onChange={(e) => setAddData({ ...addData, age: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select> */}
        <input
          type="number"
          placeholder="Age"
          value={addData?.age || ""}
          onChange={(e) => setAddData({ ...addData, age: e.target.value })}
        />
      </form>
    </section>
  )
}

export { AddUserPage }
