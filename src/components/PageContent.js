import Products from "./Products";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import SellingOverview from "./SellingOverview";
import ListAnItem from "./ListAnItem";

function PageContent() {
  return (
    <div className="pageContent">
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Products />} />
        <Route path="/sell" element={<SellingOverview />} />
        <Route path="/list" element={<ListAnItem />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default PageContent;
