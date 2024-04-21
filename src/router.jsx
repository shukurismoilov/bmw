import { createBrowserRouter } from 'react-router-dom'
import { useUserStore } from './stores'
import {
  UserListPage,
  AddUserPage,
  UserDetailsPage,
  EditUserPage,
} from './pages'


const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      await useUserStore.getState().getAll()

      return null
    },
    element: <UserListPage />,
  },
  {
    path: '/users/new',
    element: <AddUserPage />,
  },
  {
    path: '/users/:id',
    loader: async ({ params }) => {
      await useUserStore.getState().getOne(params.id)

      return null
    },
    element: <UserDetailsPage />,
  },
  {
    path: '/users/:id/edit',
    loader: async ({ params }) => {
      await useUserStore.getState().getOne(params.id)

      return null
    },
    element: <EditUserPage />,
  },
])

export { router }