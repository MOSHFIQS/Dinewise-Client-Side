import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SmoothScroll from './components/SmoothScrool'
import AuthProvider from './providers/AuthProvider'
import toast, { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <SmoothScroll />
        <Toaster />
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
