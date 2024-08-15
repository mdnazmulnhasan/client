import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { router } from './route/Route'
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import AuthProvider from './provider/AuthProvider'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


<AuthProvider>

<QueryClientProvider client={queryClient}>


<RouterProvider router={router}>


</RouterProvider>

</QueryClientProvider>
</AuthProvider>

  </React.StrictMode>,
)
