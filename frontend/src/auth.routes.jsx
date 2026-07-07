import { createBrowserRouter } from 'react-router-dom';
import Welcome from './features/auth/Welcome';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Hero from './features/pages/Hero';
import Analiytics from './features/pages/Analiytics';
import Dashboard from './features/pages/Dashboard';
import Library from './features/pages/Library';
import Show from './features/pages/Show';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/Hero",
    element: <Hero />
  },
  {
    path: "/Analiytics",
    element: <Analiytics />
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/Library/:id",
    element: <Library />
  },
  {
    path :'/show',
    element :<Show/>
  }
]);
