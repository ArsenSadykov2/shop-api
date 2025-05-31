import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Products from "./features/products/Products.tsx";
import {Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import NewProduct from "./features/products/NewProduct.tsx";
import FullProduct from "./features/products/FullProduct.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";

const App = () => {

  return (
    <>
      <CssBaseline/>
      <ToastContainer/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Products/>}/>
              <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
              <Route path="/:category_id" element={<Products/>}/>
              <Route path="/products/:id" element={<FullProduct/>}/>
              <Route path="/products/new" element={<NewProduct/>}/>
              <Route path="*" element={<Typography variant="h4">Not Found Page</Typography>}/>
            </Routes>
        </Container>
      </main>
    </>
  )
};

export default App
