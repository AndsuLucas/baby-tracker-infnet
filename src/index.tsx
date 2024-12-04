import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/Signin";
import SignUp from "./views/Signup";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import PrivateRoute from "./components/PrivateRoute";
import Eat from "./views/Eat";
import Sleep from "./views/Sleep";
import Diaper from "./views/Diaper";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: 'eat/:registerId?',
        element: (
            <PrivateRoute>
                <Eat />
            </PrivateRoute>
        )
      },
      {
        path: 'sleep/:registerId?',
        element: (
            <PrivateRoute>
                <Sleep />
            </PrivateRoute>
        )
      },
      {
        path: 'diaper/:registerId?',
        element: (
            <PrivateRoute>
                <Diaper />
            </PrivateRoute>
        )
      }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
