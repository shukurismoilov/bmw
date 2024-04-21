import { create } from 'zustand'

const useUserStore = create((set) => ({
  // get all users
  all: null,
  allLoading: false,
  allError: null,
  getAll: async () => {
    try {
      set({ allLoading: true })

      const response = await fetch(`http://localhost:8080/users`)
      const responseData = await response.json()

      set({ allLoading: false })
      set({ allError: null })
      set({ all: responseData })

    } catch (error) {
      set({ allLoading: false })
      set({ allError: error })
    }
  },
  clearAll: () => set({ all: null }),
  clearAllError: () => set({ allError: null }),

  // get user
  one: null,
  oneLoading: false,
  oneError: null,
  getOne: async (id) => {
    try {
      set({ oneLoading: true })

      const response = await fetch(`http://localhost:8080/users/${id}`)
      const responseData = await response.json()
      set({ oneLoading: false })
      set({ oneError: null })
      
      return set({ one: responseData })
    } catch (error) {
      set({ oneLoading: false })
      set({ oneError: error })
    }
  },
  clearOne: () => set({ one: null }),
  clearOneError: () => set({ oneError: null }),

  // add user
  addLoading: false,
  addError: null,
  add: async (newUser) => {
    try {
      set({ addLoading: true })

      const response = await fetch(`http://localhost:8080/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      const createdData = await response.json()
      if (createdData.id) {
        set({ addLoading: false })
        set({ addError: null })

        return createdData
      }
    } catch (error) {
      set({ addLoading: false })
      set({ addError: error })
    }
  },
  clearAddError: () => set({ addError: null }),

  // edit user
  editLoading: false,
  editError: null,
  edit: async (id, editData) => {
    try {
      set({ editLoading: true })

      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      })

      const updatedData = await response.json()
      if (updatedData.id) {
        set({ editLoading: false })
        set({ editError: null })
        return updatedData
      }
    } catch (error) {
      set({ editLoading: false })
      set({ editError: error })
    }
  },
  clearEditError: () => set({ editError: null }),

  // delete user
  deleteLoading: false,
  deleteError: null,
  delete: async (id) => {
    try {
      set({ deleteLoading: true })

      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const deletedData = await response.json()
      if (deletedData.id) {
        set({ deleteLoading: false })
        set({ deleteError: null })
        return deletedData
      }
    } catch (error) {
      set({ deleteLoading: false })
      set({ deleteError: error })
    }
  },
  clearDeleteError: () => set({ deleteError: null }),
}))

export { useUserStore }
