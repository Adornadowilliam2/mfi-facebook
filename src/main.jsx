import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from "react-cookie";
import {ToastContainer, toast} from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <StrictMode>
      <ToastContainer />
      <App />
    </StrictMode>
  </CookiesProvider>,
)
