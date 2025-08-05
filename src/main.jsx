import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './components/redux/store.js'
createRoot(document.getElementById('root')).render(



  <Provider store={store}>

  <AuthContextProvider>
    <App/>
  </AuthContextProvider>
  </Provider>
)
