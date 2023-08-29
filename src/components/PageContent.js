import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function PageContent() {
  return (
    <div className="pageContent">
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Products />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default PageContent;
