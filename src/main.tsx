import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Auth/AuthProvider.tsx";
import {BasketProvider} from "./Contexts/BasketContext.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <BasketProvider>
                <App />
            </BasketProvider>
        </AuthProvider>
    </BrowserRouter>
);
