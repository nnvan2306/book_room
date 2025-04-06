import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import NotFound from "./pages/user/NotFound";
import Layout from "./pages/user/Layout";
import ProductDetail from "./pages/user/ProductDetail";
import Dashboad from "./pages/admin/Dashboad";
import LayoutAdmin from "./pages/admin/Layout";
import Login from "./pages/auth/Login";
import IsAuth from "./components/auth/IsAuth";
import DashboadProduct from "./pages/admin/DashboadProduct";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboad"
          element={<IsAuth component={<LayoutAdmin />} />}
        >
          <Route index element={<Dashboad />} />
          <Route path="/dashboad/product" element={<DashboadProduct/>}/>          

          <Route path="/dashboad/product/add" element={<CreateProduct/>}/>

          <Route path="/dashboad/product/edit/:id" element={<EditProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
