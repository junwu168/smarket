import Products from "./Products";
import { Route, Switch } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function PageContent() {
  return (
    <div className="pageContent">
      <Switch>
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/" exact component={Products} />
        {/* Add other routes as needed */}
      </Switch>
    </div>
  );
}

export default PageContent;
