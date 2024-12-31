import 'primereact/resources/themes/lara-light-pink/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './App.css';
import AppRoutes from './routes/routes';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <AppRoutes />
        </CartProvider>
    );
}

export default App;
