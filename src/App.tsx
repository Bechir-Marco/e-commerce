import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProducDetailsPage from './pages/ProductDetailsPage';
import ProducListPage from './pages/ProductListPage';
import RegisterPage from './pages/RegisterPage';
  //protected user routes
import UserCartDetailsPage from './pages/user/UserCartDetailsPage';
import UserOrderDetailsPage from './pages/user/UserOrderDetailsPage';
import UserOrdersPage from './pages/user/UserOrdersPage';
import UserProfilePage from './pages/user/UserProfilePage';
  //protected admin routes
import AdminCreateProductPage from './pages/admin/AdminCreateProductPage';
import AdminEditProductPage from './pages/admin/AdminEditProductPage';
import AdminOrdersDetailsPage from './pages/admin/AdminOrdersDetailsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import AdminChatsPage from './pages/admin/AdminChatsPage';
import AdminEditUserPage from './pages/admin/AdminEditUserPage'
 // Componenets
 import HeaderComponent from './components/HeaderComponent';
 import FooterComponent from './components/FooterComponent';
import ProtectedRoutesComponenet from './components/ProtectedRoutesComponenet'; 
// user Componenets 

import RoutesWithUserChatComponent from './components/user/RoutesWithUserChatComponent';
function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route element={<RoutesWithUserChatComponent />}>
            {/* publicly available route */}

            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-details" element={<ProducDetailsPage />} />
            <Route
              path="/product-details/:id"
              element={<ProducDetailsPage />}
            />
            <Route path="/product-list" element={<ProducListPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={'page not Exist 404'} />
          </Route>
          {/* user protected routes */}
          <Route element={<ProtectedRoutesComponenet admin={false} />}>
            <Route
              path="/user/cart-details"
              element={<UserCartDetailsPage />}
            />
            <Route
              path="/user/order-details"
              element={<UserOrderDetailsPage />}
            />
            <Route path="/user/orders" element={<UserOrdersPage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Route>

          {/* admin protected routes */}
          <Route element={<ProtectedRoutesComponenet admin={true} />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route
              path="/admin/create-new-product"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="/admin/edit-product"
              element={<AdminEditProductPage />}
            />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route
              path="/admin/orders-details"
              element={<AdminOrdersDetailsPage />}
            />
            <Route path="/admin/chats" element={<AdminChatsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
