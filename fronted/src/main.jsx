import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import AppContextProvider from "./context/AppContext.jsx"
import { BrowserRouter } from "react-router-dom"
import './index.css'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>         
    <AppContextProvider>   {/* Now useNavigate() will work */}
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
