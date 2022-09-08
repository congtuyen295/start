import React from "react";
import { ROUTES } from "../constants/routes";
import { Switch, withRouter } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Homepage from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import DetailProduct from "../pages/DetailProduct";
import Cart from "../pages/Cart";
import ProfileUser from "../pages/Profile";
import MailActPage from "../pages/MailAct";
import AddProduct from "../pages/AddProduct";
import Categories from "../pages/Categories";
import SearchProductPage from "../pages/SearchProductPage";
import DetailOrders from "../pages/DetailOrders";
import NotFound from "../pages/NotFound";

import Products from "../components/admin/Products/index1";
import DetailProductAd from "../components/admin/DetailProduct";
import UpdateProduct from "../components/admin/UpdateProduct";
import UserManagement from "../components/admin/User";
import ListProducts from "../pages/ListProducts";
import PaymentPage from "../pages/PaymentPage";
import Orders from "../components/admin/Orders";
import Detail from "../components/admin/Orders/Detail";
import Dashboard from "../components/admin/DashBoard";
import Contact from "../pages/Contact";
import Chat from "../components/admin/Chat";

const AppRoutesComponent = () => {
  return (
    <>
      <Switch>
        <PublicRoute path={ROUTES.HOMEPAGE} exact component={Homepage} />
        <PublicRoute path={ROUTES.LOGIN} exact component={LoginPage} />
        <PublicRoute path={ROUTES.REGISTER} exact component={RegisterPage} />
        <PublicRoute path={ROUTES.MAIL} exact component={MailActPage} />
        <PrivateRoute path={ROUTES.ACCOUNT} exact component={ProfileUser} />
        <PrivateRoute path={ROUTES.DETAILORDERS} exact component={DetailOrders} />
        <PublicRoute
          path={ROUTES.SEARCHPRODUCT}
          exact
          component={SearchProductPage}
        />
        <PublicRoute
          path={ROUTES.LISTPRODUCTS}
          exact
          component={ListProducts}
        />
        <PrivateRoute path={ROUTES.PAYMENT} exact component={PaymentPage} />
        <PublicRoute
          path={ROUTES.DETAILPRODUCT}
          exact
          component={DetailProduct}
        />
        <PublicRoute path={ROUTES.CART} exact component={Cart} />
        <PublicRoute path={ROUTES.CONTACT} exact component={Contact} />

        {/* admin */}
        <AdminRoute path={ROUTES.CATEGORIES} exact component={Categories} />
        <AdminRoute path={ROUTES.ADDPRODUCT} exact component={AddProduct} />
        <AdminRoute path={ROUTES.PRODUCTS} exact component={Products} />
        <AdminRoute
          path={ROUTES.DETAILPRODUCTAD}
          exact
          component={DetailProductAd}
        />
        <AdminRoute
          path={ROUTES.UPDATEPRODUCT}
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path={ROUTES.USERMANAGEMENT}
          exact
          component={UserManagement}
        />
         <AdminRoute
          path={"/admin/chat"}
          exact
          component={Chat}
        />
        <AdminRoute path={ROUTES.ORDERS} exact component={Orders} />
        <AdminRoute path={ROUTES.DEAILORDER} exact component={Detail} />
        <AdminRoute path={ROUTES.DASHBOARD} exact component={Dashboard} />

        {/* not found */}
        <PublicRoute component={NotFound} />
      </Switch>
    </>
  );
};

export default withRouter(AppRoutesComponent);
