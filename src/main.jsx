import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactLenis } from 'lenis/react' 
import 'lenis/dist/lenis.css' 

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ReactLenis root>
      <App />
    </ReactLenis>
  </StrictMode>,
)
