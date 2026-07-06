 import React from 'react'
import Welcome from './features/auth/Welcome'
import { RouterProvider } from 'react-router-dom'
import { router } from './auth.routes'
 
 const App = () => {
   return (
     <div>
      <RouterProvider router={router} />
     </div>
   )
 }
 
 export default App
 