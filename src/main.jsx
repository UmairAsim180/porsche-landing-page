import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactLenis } from 'lenis/react' // <--- NEW IMPORT PATH
import 'lenis/dist/lenis.css' // <--- CSS IS NOW REQUIRED!

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ReactLenis root>
      <App />
    </ReactLenis>
  </StrictMode>,
)
