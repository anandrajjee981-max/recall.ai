import { createBrowserRouter } from 'react-router-dom';
import Welcome from './features/auth/Welcome';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Anand from './features/a';

export const router = createBrowserRouter([
{
    path : "/",
    element :<Welcome/>
},
{
    path : "/login",
    element :<Login/>
},
{
    path : "/register",
    element:<Register/>
},
{
    path :"/page",
    element:<Anand/>
}



])














