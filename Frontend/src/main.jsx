import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Outlet.jsx";
import App from "./App.jsx";
import {
  RightSide,
  SignUp,
  Login,
  User,
  AddMusic,
  YourMusic,
} from "./components";
import { LoginProvider } from "./context/LoginContext.jsx";
import { PlayBarProvider } from "./context/PlayBarContext.jsx";
import { AlbumLoadProvider } from "./context/AlbumLoadContext.jsx";
import ProtectedRoute from "./protectedRooutes/ProtectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />}></Route>
      <Route
        path="music"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="user-profile" element={<User />}></Route>
        <Route path="add-music" element={<AddMusic />}></Route>
        <Route path="your-music" element={<YourMusic />}></Route>
      </Route>
      <Route path="sign-up" element={<SignUp />}></Route>
      <Route path="login" element={<Login />}></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <PlayBarProvider>
        <AlbumLoadProvider>
          <RouterProvider router={router} />
        </AlbumLoadProvider>
      </PlayBarProvider>
    </LoginProvider>
  </StrictMode>
);
