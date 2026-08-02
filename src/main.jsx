import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/notifications.css";
import "./styles/mobile.css";
import { showNotification } from "./utils/notifications.js";
import { AuthProvider } from './context/AuthContext.jsx';

import App from './App.jsx'

window.alert = showNotification;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </StrictMode>,
)
