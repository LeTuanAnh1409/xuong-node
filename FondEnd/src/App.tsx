import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css';
import LayoutAdmin from './component/LayoutAdmin'
import ProductAdd from './component/ProductAdd'
import ProductEdit from './component/ProductEdit'
import ProductList from './component/ProductList'
import LayoutWebsite from './component/LayoutWebsite';
import ShopPage from './component/layout/ShopPage';
import ProductDetail from './component/layout/ProductDetail';
import SignUp from './component/Sigup';
import SignIn from './component/Sigin';
import CartPage from './component/layout/Cart';
import  Order  from './component/layout/Order';
import UserManagement from './component/UserManagement';

function App() {

  return (
    <>
      <Routes>
      <Route path='/admin' element={<LayoutAdmin/>}>
        <Route index element={<ProductList/>} />
       
      </Route>
        <Route path="/admin/products/add" element={<ProductAdd />} />
        <Route path="/admin/products/:id/edit" element={<ProductEdit />} />

        <Route path='/admin/user' element={<UserManagement/>}/>
        <Route path="/" element={<LayoutWebsite />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/orders" element={<Order/>}/>


      </Routes>
    </>
  )
}

export default App
