import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import  {connect} from 'react-redux'
import CombineModal from "../../modals";
import {LogIn} from "../../store/actions/authenticationAction";
import Spinner from "../../spinner/Spinner";
import {isAdmin} from "../../environments/constants";
import LamataLogin from "../Pages/Login/LamataLogin";
import OperatorLogin from "../Pages/Login/OperatorLogin";
import PartnerLogin from "../Pages/Login/PartnerLogin";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import LoginType from "../Pages/Login/LoginType";
// import PrivateRoute from "../../routes/PrivateRoutes";





const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('../../containers/DefaultLayout'));
const OperatorLayout = React.lazy(() => import('../../containers/DefaultLayout/OperatorLayout'));
const PartnerLayout = React.lazy(() => import('../../containers/DefaultLayout/PartnerLayout'));
const LamataLayout = React.lazy(() => import('../../containers/DefaultLayout/LamataLayout'));

// Pages
const Login = React.lazy(() => import('../Pages/Login'));
const Register = React.lazy(() => import('../Pages/Register'));
const Page404 = React.lazy(() => import('../Pages/Page404'));
const Page500 = React.lazy(() => import('../Pages/Page500'));



const PrivateRoute = ({ isLoggedIn, isAdmin, stored, ...props }) =>
  ((isLoggedIn && isAdmin) || stored) ? <Route { ...props } /> : <Redirect to="/login" />;

const OperatorRoute = ({ isLoggedIn, isOperator, stored, ...props }) =>
  ((isLoggedIn && isOperator) || stored) ? <Route { ...props } /> : <Redirect to="/operator/login" />;

const PartnerRoute = ({ isLoggedIn, isPartner, stored, ...props }) =>
  ((isLoggedIn && isPartner) || stored) ? <Route { ...props } /> : <Redirect to="/partner/login" />;

const LamataRoute = ({ isLoggedIn, isLamata, stored, ...props }) =>
  ((isLoggedIn && isLamata) || stored) ? <Route { ...props } /> : <Redirect to="/lamata/login" />;



function mapDispatchToProps(dispatch) {
  return {
    LogIn: () => dispatch(LogIn())
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  operators: state.operator.operators,
  admin: state.auth.admin,
  lamata: state.auth.lamata,
  operator: state.auth.operator,
  partner: state.auth.partner,
  token: state.auth.token,

});

const Home = ({ isAuthenticated, operator, admin, token, partner, lamata}) => {

  const isAdmin = sessionStorage.getItem('isAdmin');
  const isOperator = sessionStorage.getItem('isOperator');
  const isPartner = sessionStorage.getItem('isPartner');
  const isLamata = sessionStorage.getItem('isLamata');


  return (
    <BrowserRouter>
          <React.Suspense fallback={<Spinner />}>
            <CombineModal />
            <Switch>
              <Route exact path="/forgetpassword" name="Forget Password Page" render={props => <ForgetPassword {...props}/>} />
              <Route exact path="/account" name="Account Page" render={props => <LoginType {...props}/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/lamata/login" name="Lamata Login Page" render={props => <LamataLogin {...props}/>} />
              <Route exact path="/operator/login" name="Operator Login Page" render={props => <OperatorLogin {...props}/>} />
              <Route exact path="/partner/login" name="Partner Login Page" render={props => <PartnerLogin {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <LamataRoute isLoggedIn={isAuthenticated} isLamata={lamata} stored={isLamata} path="/lamata" name="Lamata" render={props => <LamataLayout {...props}/>} />
              <OperatorRoute isLoggedIn={isAuthenticated} isOperator={operator} stored={isOperator} path="/operator" name="Operator" render={props => <OperatorLayout {...props}/>} />
              <PartnerRoute isLoggedIn={isAuthenticated} isPartner={partner} stored={isPartner} path="/partner" name="Partner" render={props => <PartnerLayout {...props}/>} />
              <PrivateRoute isLoggedIn={isAuthenticated} isAdmin={admin} stored={isAdmin}  path="/" name="Admin" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
          </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)( Home);
