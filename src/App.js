import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products/index.jsx";
import ProductDetail from "./pages/ProductDetail/index.jsx";
import SignIn from "./pages/Auth/Singin";
import SingUp from "./pages/Auth/Singup";
import Navbar from "./components/Navbar/navbar.jsx";
import { AuthProvider } from "./context/AuthContext";
import { BasketProvider } from "./context/BasketContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Basket from "./pages/Basket/Basket.jsx"

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/basket" element={<Basket/>}/>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
