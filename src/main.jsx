import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SmoothScroll from './components/SmoothScrool'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SmoothScroll />
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
