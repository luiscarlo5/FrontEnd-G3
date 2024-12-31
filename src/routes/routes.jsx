import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductListingPage from "../pages/ProductListingPage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ProductViewPage from "../pages/ProductViewPage";
import MyOrders from "../pages/MyOrders";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductViewPage />} />
                <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default AppRoutes;
