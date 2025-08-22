import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from './Outlet.jsx'
import App from './App.jsx'
import {RightSide, SignUp, Login} from './components'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<App />}></Route>
      <Route path='music' element={<Layout />}>
      </Route>
      <Route path='sign-up' element={<SignUp />}></Route>
      <Route path='login' element={<Login />}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
