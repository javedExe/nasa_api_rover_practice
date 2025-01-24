import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ShopingMainComponent from './components/ShopingMainComponent.jsx'
// import MascRoverComponent from './components/MarsRoverComponent.jsx'
import MarsRoverCardComponent from './components/MarsRoverCardComponent.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MarsRoverCardComponent />
  </StrictMode>,
)
