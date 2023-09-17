import Products from "./Products";
import { Route, Routes, Navigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import SellingOverview from "./SellingOverview";
import ListAnItem from "./ListAnItem";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("userToken");

  // If token exists, render the children (the actual component), else redirect to a login or home page.
  return token ? children : <Navigate to="/" />;
}

function PageContent() {
  return (
    <div className="pageContent">
      <Routes>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/" element={<Products />} />

        {/* Wrapped SellingOverview and ListAnItem inside PrivateRoute */}
        <Route
          path="/sell"
          element={
            <PrivateRoute>
              <SellingOverview />
            </PrivateRoute>
          }
        />
        <Route
          path="/list"
          element={
            <PrivateRoute>
              <ListAnItem />
            </PrivateRoute>
          }
        />

        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default PageContent;
